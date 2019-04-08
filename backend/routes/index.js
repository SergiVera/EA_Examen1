'use strict';

const express = require('express');
const bikeCtrl = require('../controllers/bike');
const stationCtrl = require('../controllers/station');
const api = express.Router();

/**
 * Routes restful API
 */
api.get('/stations', stationCtrl.getStations);
api.post('/stations/addbike', stationCtrl.postStationBike);
api.post('/stations', stationCtrl.postStation);
//api.get('/subjects/:subjectId', subjectCtrl.getSubjectDetail);
api.get('/stations/:stationId/bikedetail', stationCtrl.getStationBikeDetail);
//api.delete('/subjects/:subjectId', subjectCtrl.deleteSubject);
api.delete('/stations/:stationId/deletebike/:bikeId', stationCtrl.deleteBikeStation);

api.get('/bikes', bikeCtrl.getBikes);
api.get('/bikes/unassigned', bikeCtrl.getUnassaignedBikes);
//api.get('/students/:studentId', studentCtrl.getSingleStudent);
api.post('/bikes', bikeCtrl.postBike);
/*api.delete('/students/:studentId', studentCtrl.deleteStudent);
api.put('/students/:studentId', studentCtrl.updateStudent);*/


module.exports = api;
