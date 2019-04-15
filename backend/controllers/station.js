'use strict';

const mongoose = require('mongoose');
const Bike = require('../models/bike');
const Station = require('../models/station');

async function getText(req, res) {
    res.status(200).send({message: "Hello World!"})
}

/**
 * Add new Station to the station collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postStation(req, res) {
    console.log('Station Name', req.body.name);
    const station = new Station();
    station.station = req.body.station;
    station.state = req.body.state;
    station.description = req.body.description;
    console.log(station);

    try {
        await station.save();
        res.status(200).send({message: "Station created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

/**
 * Get all the stations
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getStations(req, res) {
    try {
        let stations = await Station.find().select({bikes: 0});
        res.status(200).send(stations);
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Add bike to a station, only if this bike is unassigned
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postStationBike(req, res) {
    try{
        const bikeId = req.body.bikeId;
        const stationId = req.body.stationId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let bikeFound = await Bike.findById(bikeId);

        if (!bikeFound) {
            return res.status(404).send({message: 'Bike not found'})
        } else if (bikeFound.assigned === true) {
            return res.status(500).send({message: 'Bike is assigned to another station'})
        }
        else {
            let stationUpdated = await Station.findOneAndUpdate({_id: stationId}, {$addToSet: {bikes: bikeId}});
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "true"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message: "Bike added successfully to the station"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

/**
 * Get the details of the bikes of a specific station
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getStationBikeDetail(req, res) {
    try {
        const _id = req.params.stationId;

        //We use populate to return the detail of every bike
        //Populates automatically find every bike that has the specified ID, instead of doing by us
        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Delete a students inside a subject
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function deleteBikeStation(req,res) {
    try{
        const stationId = req.params.stationId;
        const bikeId = req.params.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let station = await Station.findById(stationId);
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            mongoose.Types.ObjectId(bikeId);

            let stationUpdated = await Station.update({_id: stationId}, {$pull: {bikes: bikeId}});

            if (stationUpdated.nModified === 0) {
                return res.status(404).send({message: 'Bike not found'})
            }

            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "false"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message:'Bike deleted successfully'});
    }catch(err){
        res.status(500).send(err)
    }
}

/**
 * Export all the functions to use them anywhere
 * @type {{getSubjectDetail: getSubjectDetail, postSubject: postSubject, deleteSubject: deleteSubject, postStudentSubject: postStudentSubject, getSubjects: getSubjects, deleteStudentSubject: deleteStudentSubject, getStudentSubjectDetail: getStudentSubjectDetail}}
 */
module.exports = {
    getText,
    postStation,
    getStations,
    postStationBike,
    getStationBikeDetail,
    deleteBikeStation
};
