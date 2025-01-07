import mashov from 'mashov-api';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
