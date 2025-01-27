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
const GradesElement = (grades) => {
    const gradesObj = grades;
    let gradeTable;
    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Grades</th>
                        <th>Subject+Group name</th>
                        <th>Grade Event </th>
                        <th>Date</th>
                        <th>Teacher</th>
                    </tr>
                </thead>

                <tbody>
                {gradesObj.grades.gradesData.map((grade, index) => (
                    <tr key={index}>
                        <td>{grade.grade? grade.grade : "no grade given"} </td>
                        <td>{grade.groupName}</td>
                        <td>{grade.gradingEvent}</td>
                        <td>{formatDate(grade.timestamp)}</td>
                        <td>{grade.teacherName}</td>
                    </tr>
                ))}
                </tbody>

            </table>
            {gradesObj.grades.gradesData.map((grade, index) => (
                console.log(grade)
                
            ))}
            { JSON.stringify(gradesObj, null, 2)}
        </div>
    );
};

export default GradesElement;