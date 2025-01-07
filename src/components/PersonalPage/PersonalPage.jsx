import { useLocation } from "react-router-dom";

function PersonalPage() {
  const location = useLocation(); // Get the location object
  const personalData = location.state?.data; // Access the personal data from the state

  return (
    <div>
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

export default PersonalPage;
