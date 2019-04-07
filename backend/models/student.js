const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Student schema
 */
const StudentSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phones: [{
        key: String,
        value: String
    }]
});

/**
 * Export the Student schema
 * @type {Model}
 */
module.exports = mongoose.model('Student', StudentSchema);

