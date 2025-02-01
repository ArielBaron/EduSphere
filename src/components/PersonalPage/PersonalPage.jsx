import { useLocation } from "react-router-dom";
import HorizontalNavbar from "../HorizontalNavbar/HorizontalNavbar.jsx";  // Import the Navbar
import VacationElement from "./VactionElement/VactionElement.jsx";  
import TestsElement from "./TestsElement/TestsElement.jsx";
import GradesElement from "./GradesElement/GradesElement.jsx";
import TimetableElement from "./TimeTableElement/TimeTableElement.jsx";
function PersonalPage() {
  const location = useLocation();  // Get the location object
  const personalData = location.state?.data;  // Access the personal data from the state
  const pageState = location.pathname;
  console.log(pageState);
  let grades = "";
  let behavior = "";
  let iscoolData = "";
  let mashovTimetable = "";
  if(localStorage.getItem("personalData") === null){
    localStorage.setItem("personalData",JSON.stringify(personalData));
  }
  else{
    grades = JSON.parse(localStorage.getItem("personalData")).grades;
    behavior = JSON.parse(localStorage.getItem("personalData")).behavior;
    iscoolData = JSON.parse(localStorage.getItem("personalData")).iscool;
    mashovTimetable = JSON.parse(localStorage.getItem("personalData")).mashovTimetable;

  }
  // Example of props to be passed to HorizontalNavbar
  const navbarProps = {
    tags: {
      "home": "/personal",
      "grades": "/personal/grades",
      "timetable and Changes": "/personal/timetable",
      "Vactions": "/personal/vactions",
      "tests": "/personal/tests",
      "homework": "/personal/homework"
    }
  };

  let content="";
  switch (pageState) {
    case "/personal/grades":
      content = <GradesElement grades={grades}/>;
      break;
    case "/personal/homework":
      content = <div>Homework content goes here</div>;
      break;
    case "/personal/vactions":
      content = <VacationElement />;
      break;
    case "/personal/tests":
      content = <TestsElement />;
      
      break;
    case "/personal/timetable":
      
      content = <TimetableElement mashovAndIscoolTimetable={mashovTimetable} iscoolTimetable={iscoolData}/>
      break;
    case "/personal":
      content = (
        <div>
          <h1>Personal Data</h1>
          {
            <div>
              <h2>Grades</h2>
              <pre>{ JSON.stringify(grades, null, 2)}</pre>

              <h2>Behavior</h2>
              <pre>{ JSON.stringify(behavior, null, 2)}</pre>

              <h2>IsCool Timetable and Changes</h2>
              <pre>{ JSON.stringify(iscoolData, null, 2)}</pre>

              <h2>Mashov Timetable</h2>
              <pre>{ JSON.stringify(mashovTimetable, null, 2)}</pre>
            </div>
          }
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div>
      <HorizontalNavbar tags={navbarProps.tags} />
      {content}
    </div>
  );
}

export default PersonalPage;
