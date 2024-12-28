import express from 'express';
import bodyParser from 'body-parser';; 
// Funcs for fetching mashov data
import fetchBehavior from './mashov/behavior.js';
import fetchGrades  from './mashov/grades.js'
import getTimetableAndChanges from './getTimeTable.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function encodeHebClass(hebClassStr) {
  const hebrewToEnglishMap = {
    'א': 'a',
    'ב': 'b',
    'ג': 'c',
    'ד': 'd',
    'ה': 'e',
    'ו': 'f',
    'ז': 'g',
    'ח': 'h',
    'ט': 'i',
    'י': 'j',
    'י"א': 'k',
    'י"ב': 'l'
  };

  // Match the class prefix and replace using the map
  return hebClassStr
    .replace(/י"ב|י"א|[א-י]/g, match => hebrewToEnglishMap[match] || match) // Map Hebrew to English
    .replace(/^([a-z])(\d)/i, '$1-$2'); // Ensure there's a '-' between the letter and number
}
const getGrades = async (loginInfo) => {
    if (!loginInfo) {
      throw new Error('Not logged in to Mashov');
    }
  
    const grades = await fetchGrades(loginInfo);
    // Process the grades data
    const processedGrades = grades.map(obj => {
      delete obj.groupId;
      delete obj.gradingPeriod;
      delete obj.gradeTypeId;
      delete obj.gradeRate;
      delete obj.id;
      delete obj.gradingEventId;
      delete obj.studentGuid;
      delete obj.rate;
      delete obj.year;
      return obj;
    });
  
    // Structure grades by subject
    const subjectGrades = {};
    processedGrades.forEach(entry => {
      const { subjectName, grade } = entry;
  
      if (subjectGrades[subjectName]) {
        subjectGrades[subjectName].push(grade);
      } else {
        subjectGrades[subjectName] = [grade];
      }
    });
  
    return { subjectGrades, gradesData: processedGrades };
  };

  app.get('/submit', async (req, res) => {
    const { id, semel,  userClass, password } = req.query;  // Change req.body to req.query
    const loginInfo =  {
      "SEMEL": semel,
      "ID": id,
      "PASSWORD": password,
      "CLASS": userClass 
    }
    console.log(await getTimetableAndChanges(loginInfo));
    res.status(200).json({ message: 'Form submitted successfully', data: req.query });  // Use req.query here as well
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

