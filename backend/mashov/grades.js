import mashov from 'mashov-api';
import fs from 'fs';

const fetchGrades = async (credentials) => {
    const { SEMEL, YEAR, ID, PASSWORD } = credentials;
    try {
        const loginInfo = await mashov.loginToMashov(SEMEL, YEAR, ID, PASSWORD);
        const grades = await mashov.get(loginInfo, 'grades');
        return grades;
    } catch (error) {
        console.error('Error fetching grades data:', error);
        throw error;
    }
};
// Testing Example:
// const loginInfo =  {
//   "SEMEL": process.env.REACT_APP_SEMEL,
//   "ID": process.env.REACT_APP_ID,
//   "PASSWORD": process.env.REACT_APP_PASSWORD,
//   "CLASS": process.env.REACT_APP_CLASS 
// }
// console.log(await fetchGrades(loginInfo))
export default fetchGrades