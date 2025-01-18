import { useLocation } from "react-router-dom";
import HorizontalNavbar from "../HorizontalNavbar/HorizontalNavbar.jsx";  // Import the Navbar
import VacationElement from "./VactionElement/VactionElement.jsx";  
import TestsElement from "./TestsElement/TestsElement.jsx";
import GradesElement from   "./GradesElement/GradesElement.jsx";
function PersonalPage() {
  const location = useLocation();  // Get the location object
  const personalData = location.state?.data;  // Access the personal data from the state
  let pageState = location.pathname;
  console.log(pageState)
  // Example of props to be passed to HorizontalNavbar
  const navbarProps = {
    tags: {
      "grades": "/personal/grades",
      "timetable and Changes": "/personal/timetable",
      "Vactions": "/personal/vactions",
      "tests": "/personal/tests",
      "homework": "/personal/homework"
    }
  };
  if(pageState === "/personal/grades"){
    return(
      <div>
      
        <HorizontalNavbar tags={navbarProps.tags} />
      </div>
    )
  }
  else if(pageState = "/personal/homework"){
    return(
      
      <HorizontalNavbar tags={navbarProps.tags} />
    )
  }
  else if (pageState=="/personal"){
    return (
      <div>
        <HorizontalNavbar tags={navbarProps.tags} />
        
        <h1>Personal Data</h1>
        {personalData ? (
          <div>
            <h2>Grades</h2>
            <pre>{JSON.stringify(personalData.grades, null, 2)}</pre>

            <h2>Behavior</h2>
            <pre>{JSON.stringify(personalData.behavior, null, 2)}</pre>

            <h2>IsCool Timetable and Changes</h2>
            <pre>{JSON.stringify(personalData.iscool, null, 2)}</pre>

            <h2>Mashov Timetable</h2>
            <pre>{JSON.stringify(personalData.mashovTimetable, null, 2)}</pre>
          </div>
        ) : (
          <p>No personal data available.</p>
        )}
      </div>
    );
  }
}

export default PersonalPage;
