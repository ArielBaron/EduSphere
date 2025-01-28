import React from 'react';
import "./GradesElement.css"
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // Get day, month, year, hours, minutes, and seconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format the output as "dd/mm/yy hh:mm:ss"
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  function filterGrades(gradesData) {
    const gradedEntries = [];
    const nullGrades = [];
  
    gradesData.grades.gradesData.forEach(entry => {
      if (entry.grade !== null && entry.grade !== undefined) {
        gradedEntries.push(entry);
      } else {
        nullGrades.push(entry);
      }
    });
  
    // Sort the valid grades in descending order
    gradedEntries.sort((a, b) => b.grade - a.grade);
  
    // Merge the valid grades and null grades
    return [...gradedEntries, ...nullGrades];
  }
const genGradeTable = (gradesData,order) => {
    if(order==="grade"){
        gradesData = filterGrades(gradesData);
    }
    return(
        <table border="1">
            <thead>
                <tr>
                    <th>ציונים</th>
                    <th>שם מקצוע+קבוצה</th>
                    <th>אירוע ציון</th>
                    <th>תאריך</th>
                    <th>מורה</th>
                </tr>
            </thead>

            <tbody>
            {gradesData.grades.gradesData.map((grade, index) => (
                <tr key={index}>                                  
                    <td>{grade.grade ? grade.grade : "לא ניתנה ציון"}</td>
                    <td>{grade.groupName}</td>
                    <td>{grade.gradingEvent}</td>
                    <td>{formatDate(grade.timestamp)}</td>
                    <td>{grade.teacherName}</td>
                    
                    
                </tr>
            ))}
            </tbody>

        </table>
    );
}
const GradesElement = (grades) => {
    const gradesObj = grades;
    let gradeTable = genGradeTable(gradesObj,document.getElementById("sorter")? document.getElementById("sorter").value : null);
    return (
        <div>
            <select name="sorter" defaultValue={"grade"}  id="sorter">
                <option value="grade">ציון</option>
                <option value="teacherName">שם המורה</option>
                <option value="subject">מקצוע</option>
                <option  value="date">תאריך</option>
            </select>
            
            {gradeTable}
            {gradesObj.grades.gradesData.map((grade, index) => (
                console.log(grade)
                
            ))}
            { JSON.stringify(gradesObj, null, 2)}
        </div>
    );
};

export default GradesElement;