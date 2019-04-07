'use strict';

const express = require('express');
const studentCtrl = require('../controllers/student');
const subjectCtrl = require('../controllers/subject');
const api = express.Router();

/**
 * Routes restful API
 */
api.get('/subjects', subjectCtrl.getSubjects);
api.post('/subjects/addstudent', subjectCtrl.postStudentSubject);
api.post('/subjects', subjectCtrl.postSubject);
api.get('/subjects/:subjectId', subjectCtrl.getSubjectDetail);
api.get('/subjects/:subjectId/studentdetail', subjectCtrl.getStudentSubjectDetail);
api.delete('/subjects/:subjectId', subjectCtrl.deleteSubject);
api.put('/subjects/deletestudent', subjectCtrl.deleteStudentSubject);

api.get('/students', studentCtrl.getStudents);
api.get('/students/:studentId', studentCtrl.getSingleStudent);
api.post('/students', studentCtrl.postStudent);
api.delete('/students/:studentId', studentCtrl.deleteStudent);
api.put('/students/:studentId', studentCtrl.updateStudent);


module.exports = api;
