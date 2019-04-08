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
 * Delete student from Students collection
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function deleteStudent(req, res) {
    try {
        const _id = req.params.studentId;

        let student = await Student.findByIdAndDelete(_id);
        if(!student){
            return res.status(404).send({message: 'Student not found'})
        }else{
            mongoose.Types.ObjectId(_id);

            await Subject.update({}, {$pull: {students: _id}}, {multi: true});

            res.status(200).send({message:'Student deleted successfully'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

/**
 * Update the specified StudentService from Students collection
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function updateStudent(req, res) {
    try{
        const _id = req.params.studentId;
        let student = await Student.findByIdAndUpdate(_id, req.body, {runValidators: true});
        if(!student){
            return res.status(404).send({message: 'Student not found'})
        }else{
            res.status(200).send(student)
        }
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
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

async function getUnassaignedBikes(req, res) {
    try {

    } catch(err) {

    }
}

/**
 * Get student by its ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getSingleStudent(req, res) {
    try {
        const studentId = req.params.studentId;

        let student = await Student.findById(studentId);
        if(!student){
            return res.status(404).send({message: 'Student not found'})
        }else{
            res.status(200).send(student)
        }
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
    deleteStudent,
    updateStudent,
    getBikes,
    getSingleStudent,
    getUnassaignedBikes
};
