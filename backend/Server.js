import express from 'express';
import bodyParser from 'body-parser';; 
// Funcs for fetching mashov data
import fetchTimetable from './mashov/timetable.js'
import fetchBehavior from './mashov/behavior.js';
import fetchGrades  from './mashov/grades.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/submit', (req, res) => {
    const { id, semel, class: userClass, password } = req.body;

    console.log('Received Form Data:', { id, semel, userClass, password });

    res.status(200).json({ message: 'Form submitted successfully', data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

