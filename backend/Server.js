import express from 'express';
import bodyParser from 'body-parser';; 
// Funcs for fetching mashov data
import fetchBehavior from './mashov/behavior.js';
import fetchGrades  from './mashov/grades.js'
import fetchTimetable from './mashov/timetable.js';
import getIsCoolTimetableAndChanges from './getTimeTable.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getMashovTimetable = async(loginInfo) => {


    const timetable = await fetchTimetable(loginInfo);

    // Process the timetable data
    const processedTimetable = timetable.map(obj => {
      delete obj.groupDetails.groupInactiveTeachers;
      delete obj.groupDetails.groupId;
      delete obj.groupDetails.subjectName;

      const { day, lesson } = obj.timeTable;
      obj.groupDetails.day = day;
      obj.groupDetails.lesson = lesson;
      delete obj.timeTable;

      const teacherNames = obj.groupDetails.groupTeachers.map(teacher => teacher.teacherName);
      obj.groupDetails.teacherName = teacherNames.join(", ");
      delete obj.groupDetails.groupTeachers;

      return obj;
    });

    // Split timetableData into sublists based on the day property
    const timetableByDay = {};
    processedTimetable.forEach(obj => {
      const { day, ...rest } = obj.groupDetails;
      if (!timetableByDay[day]) {
        timetableByDay[day] = [];
      }
      timetableByDay[day].push(rest);
    });

    // Sort by lesson
    for (const day in timetableByDay) {
      timetableByDay[day].sort((a, b) => a.lesson - b.lesson);
    }

    return timetableByDay;
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


app.get('/submit', async (req, res) => {
  const { id, semel,  userClass, password } = req.query;  // Change req.body to req.query
  const loginInfo =  {
    "SEMEL": semel,
    "ID": id,
    "PASSWORD": password,
    "CLASS": userClass,
    "YEAR": new Date().getFullYear() + 1
  }
  const gradesData = await getGrades(loginInfo);
  const behaviorData = await getBehavior(loginInfo);
  const iscoolTimetableAndChangesData = await getIsCoolTimetableAndChanges(loginInfo);
  const mashovTimetableData = await getMashovTimetable(loginInfo);


  res.status(200).json({ message: 'Form submitted successfully', data: req.query });  // Use req.query here as well
  res.redirect("/personal-info")
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

