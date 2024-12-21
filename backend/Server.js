const express = require('express');
const path = require('path'); 
// Funcs for fetching mashov data
const fetchBehavior = require('./mashov/behavior');
const fetchTimetable = require('./mashov/timetable');
const fetchGrades = require('./mashov/grades')
const app = express();
const port = process.env.PORT || 3000;



