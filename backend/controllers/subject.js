'use strict';

const mongoose = require('mongoose');
const Student = require('../models/student');
const Subject = require('../models/subject');

/**
 * Add new SubjectService to the subject collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postSubject(req, res) {
    console.log('Subject Name', req.body.name);
    const subject = new Subject();
    subject.name = req.body.name;
    console.log(subject);

    try {
        await subject.save();
        res.status(200).send({message: "Subject created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

/**
 * Get all the subjects
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getSubjects(req, res) {
    try {
        let subjects = await Subject.find().select({students: 0});
        res.status(200).send(subjects);
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Get the details of a specific subject given its id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getSubjectDetail(req, res) {
    try {
        const _id = req.params.subjectId;

        //We use populate to return the detail of every student, but only the name
        //Populates automatically find every student that has the specified ID, instead of doing by us
        let subject = await Subject.findById(_id).populate('students', 'name');
        if(!subject){
            return res.status(404).send({message: 'Subject not found'})
        }else{
            res.status(200).send(subject)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Add student to a subject, only if this student has not been added previously
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postStudentSubject(req, res) {
    try{
        const subjectId = req.body.subjectId;
        const studentId = req.body.studentId;

        console.log(`SubjectID: ${subjectId}, StudentID: ${studentId}`);

        let studentFound = await Student.findById(studentId);

        if (!studentFound) {
            return res.status(404).send({message: 'Student not found'})
        } else {
            let subjectUpdated = await Subject.findOneAndUpdate({_id: subjectId}, {$addToSet: {students: studentId}});
            if (!subjectUpdated) {
                return res.status(404).send({message: 'Subject not found'})
            }
        }
        res.status(200).send({message: "Student added successfully to the subject"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

/**
 * Get the details of the students of a specific subject
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getStudentSubjectDetail(req, res) {
    try {
        const _id = req.params.subjectId;

        //We use populate to return the detail of every student
        //Populates automatically find every student that has the specified ID, instead of doing by us
        let subject = await Subject.findById(_id).populate('students');
        if(!subject){
            return res.status(404).send({message: 'Subject not found'})
        }else{
            res.status(200).send(subject)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Delete a subject given its ID
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function deleteSubject(req, res) {
    try{
        const _id = req.params.subjectId;
        let subject = await Subject.findByIdAndRemove(_id);
        if(!subject){
            return res.status(404).send({message: 'Subject not found'})
        }else{
            res.status(200).send({message:'Subject deleted successfully'})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

/**
 * Delete a students inside a subject
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function deleteStudentSubject(req,res) {
    console.log("I'm in");
    try{
        const subjectId = req.body.subjectId;
        const studentId = req.body.studentId;

        console.log(`SubjectID: ${subjectId}, StudentID: ${studentId}`);

        let subject = await Subject.findById(subjectId);
        if(!subject){
            return res.status(404).send({message: 'Subject not found'})
        }else{
            mongoose.Types.ObjectId(studentId);

            let subjectUpdated = await Subject.update({_id: subjectId}, {$pull: {students: studentId}});

            if (subjectUpdated.nModified === 0) {
                return res.status(404).send({message: 'Student not found'})
            }
        }
        res.status(200).send({message:'Student deleted successfully'});
    }catch(err){
        res.status(500).send(err)
    }
}

/**
 * Export all the functions to use them anywhere
 * @type {{getSubjectDetail: getSubjectDetail, postSubject: postSubject, deleteSubject: deleteSubject, postStudentSubject: postStudentSubject, getSubjects: getSubjects, deleteStudentSubject: deleteStudentSubject, getStudentSubjectDetail: getStudentSubjectDetail}}
 */
module.exports = {
    postSubject,
    getSubjects,
    getSubjectDetail,
    postStudentSubject,
    getStudentSubjectDetail,
    deleteSubject,
    deleteStudentSubject
};
