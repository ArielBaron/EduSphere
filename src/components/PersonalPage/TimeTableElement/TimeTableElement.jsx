function genTable(mashovTimetable,iscoolChanges,iscoolTimetable){

  return (
    <div>
      <table>
        <tr>

        </tr>
      </table>
    </div>
  )
}
function uniteAndFilter(mashovTimetable, iscoolTimetable, timesPerHour) {


  return null;
}



function parseSchedule(jsonString) {
    try {
      const cleanJsonString = jsonString.replace(/\u00a0/g, ' ');
      const scheduleData = JSON.parse(cleanJsonString);
  
      const { daysArray, timesPerHour } = scheduleData;
      const schedule = [];
  
      daysArray.forEach((dayArray) => {
        if (dayArray.length === 0) return;
  
        const daySchedule = {
          day: dayArray[0],
          events: [],
        };
  
        for (let i = 1; i < dayArray.length; i++) {
          const eventText = dayArray[i];  
          // Extract subject, room, and teacher
          const match = eventText.match(/^(.+?)\s+\((.*?)\)\s+(.+)$/);
          const subjectGroup = match ? match[1] : eventText;
          const room = match ? match[2] : '';
          const teacher = match ? match[3] : '';
  
          daySchedule.events.push({
            subjectGroup,
            room,
            teacher,
          });
        }
  
        schedule.push(daySchedule);
      });
  
      return [schedule,timesPerHour];
    } catch (error) {
      console.error("Failed to parse schedule:", error);
      return [];
    }
  }
  

  
const TimetableElement = (mashovAndIscoolTimetable,) => {
  const mashovTimetable = mashovAndIscoolTimetable.mashovAndIscoolTimetable;
  console.log(mashovTimetable);
  
  return (
    <div>a</div>
  )


    
}
export default TimetableElement;