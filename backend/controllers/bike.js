'use strict';

const mongoose = require('mongoose');
const Bike = require('../models/bike');
const Station = require('../models/station');

/**
 * Add bike to Bike collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postBike(req, res) {
    const bike = new Bike();
    bike.bike = req.body.bike;
    bike.kms = req.body.kms;
    bike.description = req.body.description;
    bike.assigned = req.body.assigned;

    console.log(bike);

    try {
        await bike.save();
        res.status(200).send({message: "Bike created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

/**
 * Get all bikes
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBikes(req, res) {
    try {
        let bikes = await Bike.find();
        res.status(200).send(bikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getUnassignedBikes(req, res) {
    try {
        let unassignedBikes = await Bike.find({assigned: "false"});
        res.status(200).send(unassignedBikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Export all the functions to use them anywhere
 * @type {{getStudents: getStudents, updateStudent: updateStudent, postStudent: postStudent, deleteStudent: deleteStudent, getSingleStudent: getSingleStudent}}
 */
module.exports = {
    postBike,
    getBikes,
    getUnassignedBikes
};
