import React, { useState } from 'react';
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
  function filterByGrades(gradesData) {
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
function filterByTeacherName(gradesData){
    const orderedList = [];
    gradesData.grades.gradesData.forEach(entry => {
        orderedList.push(entry);
    });
    return orderedList.sort((a,b) => a.teacherName.localeCompare(b.teacherName));
}
function filterBySubject(gradesData) {
    const orderedList = [];
    const groupNameGroups = {};

    // Group objects by subject
    gradesData.grades.gradesData.forEach(entry => {
        if (!groupNameGroups[entry.groupName]) {
            groupNameGroups[entry.groupName] = [];
        }
        groupNameGroups[entry.groupName].push(entry);
    });

    // Flatten the subjectGroups into orderedList
    for (let groupName in groupNameGroups) {
        orderedList.push(...groupNameGroups[groupName]);
    }
    return orderedList;
}

function filterByDate(gradesData){
    const orderedList = [];
    gradesData.grades.gradesData.forEach(entry => {
        orderedList.push(entry);
    });
    orderedList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    

    
    
    return orderedList;
}

  const genGradeTable = (gradesData, order) => {
    let filteredGradesData;
    if (order === "grade") {
        filteredGradesData = filterByGrades(gradesData);
    }
    else if(order == "teacherName"){
        filteredGradesData = filterByTeacherName(gradesData);
    }
    else if(order == "subject"){
        filteredGradesData = filterBySubject(gradesData);
    }
    else if(order == "date"){
        filteredGradesData = filterByDate(gradesData);
    } 
    else {
        filteredGradesData = [];
    }

    return (
        <table id="gradesTable" border="1">
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
                {filteredGradesData.map((grade, index) => (
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
};

const GradesElement = (grades) => {
    
    const handleSelectChange = (event) => {
        setOrder(event.target.value)
    }
    const [order, setOrder] = useState("date");

    
    const gradesObj = grades; 
    let gradeTable = genGradeTable(gradesObj,order);
    return (
        <div >
            <select name="sorter" defaultValue={"grade"} onChange={handleSelectChange} id="sorter">
                <option value="grade">ציון</option>
                <option value="teacherName">שם המורה</option>
                <option value="subject">מקצוע</option>
                <option  value="date">תאריך</option>
            </select>            
            {gradeTable}
        </div>
    );
};

export default GradesElement;