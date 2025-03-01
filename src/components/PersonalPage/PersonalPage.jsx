import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HorizontalNavbar from "../HorizontalNavbar/HorizontalNavbar.jsx"; 
import VacationElement from "./VactionElement/VactionElement.jsx";  
import TestsElement from "./TestsElement/TestsElement.jsx";
import GradesElement from "./GradesElement/GradesElement.jsx";
import TimetableElement from "./TimeTableElement/TimeTableElement.jsx";

function PersonalPage() {
  const location = useLocation();  
  const pageState = location.pathname;
  const personalData = location.state.data;


  let grades = personalData.grades || [];
  let behavior = personalData.behavior || {};
  let iscoolData = personalData.iscool || {};
  let mashovTimetable = personalData.mashovTimetable || {};

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

  let content = "";
  switch (pageState) {
    case "/personal/grades":
      content = <GradesElement grades={grades} />;
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
      content = <TimetableElement mashovAndIscoolTimetable={mashovTimetable} iscoolTimetable={iscoolData} />;
      break;
    case "/personal":
      content = (
        <div>
          <h1>Personal Data</h1>
          <div>
            <h2>Grades</h2>
            <pre>{JSON.stringify(grades, null, 2)}</pre>

            <h2>Behavior</h2>
            <pre>{JSON.stringify(behavior, null, 2)}</pre>

            <h2>IsCool Timetable and Changes</h2>
            <pre>{JSON.stringify(iscoolData, null, 2)}</pre>

            <h2>Mashov Timetable</h2>
            <pre>{JSON.stringify(mashovTimetable, null, 2)}</pre>
          </div>
        </div>
      );
      break;
    default:
      content = <div>Page not found</div>;
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
