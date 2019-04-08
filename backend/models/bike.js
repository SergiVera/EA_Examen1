const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Bike schema
 */
const BikeSchema = new Schema({
    bike: { type: String, required: true },
    kms: { type: Number, required: true },
    description: { type: String, required: true, unique: true },
    assigned: { type: Boolean, required: true, unique: false }
});

/**
 * Export the Bike schema
 * @type {Model}
 */
module.exports = mongoose.model('Bike', BikeSchema);

