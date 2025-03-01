import express from 'express';
import bodyParser from 'body-parser';; 
// Funcs for fetching mashov data
import fetchBehavior from './mashov/behavior.js';
import fetchGrades  from './mashov/grades.js'
import fetchTimetable from './mashov/timetable.js';
import getIsCoolTimetableAndChanges from './getTimeTable.js';
import cors from 'cors'; // Import cors package

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_PORT = process.env.REACT_APP_FRONTEND_PORT;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getMashovTimetable = async(loginInfo) => {


    const timetable = await fetchTimetable(loginInfo);
    console.log(timetable);
    // Process the timetable data
    const processedTimetable = timetable.map(obj => {

      const { day, lesson, room } = obj.timeTable;
      obj.groupDetails.day = day;
      obj.groupDetails.lesson = lesson;
      obj.groupDetails.roomNum = room;
      return obj;
    });
    console.log('\n\n\n'+" b:"+JSON.stringify(processedTimetable,2,null));

    return processedTimetable;
};
// Process and filter behavior data
const getBehavior = async(loginInfo) => {

  const behavior = await fetchBehavior(loginInfo);

  // Process the behavior data
  const processedBehavior = behavior.map(obj => {
    if (obj.achvaName !== "נוכחות בשיעור מקוון") {
      delete obj.timestamp;
    }
    delete obj.reporterGuid;
    delete obj.lessonId;
    delete obj.achvaCode;
    delete obj.achvaAval;
    delete obj.justificationId;
    delete obj.studentGuid;
    delete obj.eventCode;
    delete obj.lessonType;
    delete obj.lessonReporter;
    obj.justified = obj.justified === 9 ? "מוצדק" : "לא מוצדק";
    delete obj.groupId;

    // Format lesson date
    const lessonDate = new Date(obj.lessonDate).toISOString().split('T')[0];
    obj.lessonDate = lessonDate.split("-").reverse().join("-");
    return obj;
  });

  return processedBehavior
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

function getIsraeliSchoolYear() {
  const date = new Date();
  const year = date.getFullYear();
  return date.getMonth() > 5? year+1: year;
}

app.post('/submit', async (req, res) => {
  const { id, semel,  userClass, password } = req.body;  // Change req.body to req.query
  let iscoolTimetableAndChangesData=[];
  const loginInfo =  {
    "SEMEL": semel,
    "ID": id,
    "PASSWORD": password,
    "CLASS": userClass,
    "YEAR": getIsraeliSchoolYear()
  }

  const gradesData = await getGrades(loginInfo);
  const behaviorData = await getBehavior(loginInfo);
  try {
    throw Error;
    iscoolTimetableAndChangesData = await getIsCoolTimetableAndChanges(loginInfo);
  } catch (error) {
    iscoolTimetableAndChangesData = undefined;
    console.log(error)
  }
  finally{
    const mashovTimetableData = await getMashovTimetable(loginInfo);
   
    const personalData = {
      grades: gradesData,
      behavior: behaviorData,
      iscool: iscoolTimetableAndChangesData,
      mashovTimetable: mashovTimetableData
    };
    res.json({ message: "Good", data: personalData });

  }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

