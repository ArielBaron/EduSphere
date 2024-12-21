import mashov from 'mashov-api';
import fs from 'fs';

const fetchTimetable = async (credentials) => {
    const { SEMEL, YEAR, ID, PASSWORD } = credentials;
    try {
        const loginInfo = await mashov.loginToMashov(SEMEL, YEAR, ID, PASSWORD);
        const timetable = await mashov.get(loginInfo, 'timetable');
        return timetable;
    } catch (error) {
        console.error('Error fetching timetable data:', error);
        throw error;
    }
};

export default fetchTimetable;
