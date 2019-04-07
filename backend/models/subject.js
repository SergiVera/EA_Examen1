const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of SubjectService schema, containing the student id
 */
const SubjectSchema = new Schema ({
    name: { type: String, required: true, unique: true },
    students: [{ type: Schema.ObjectId, ref: 'Student', unique: false }]
});

/**
 * Export the SubjectService schema
 * @type {Model}
 */
module.exports = mongoose.model('Subject', SubjectSchema);
