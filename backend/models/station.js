const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Station schema
 */
const StationSchema = new Schema ({
    station: { type: String, required: true, unique: true },
    state: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    bikes: [{ type: Schema.ObjectId, ref: 'Bike', unique: false }]
});

/**
 * Export the Station schema
 * @type {Model}
 */
module.exports = mongoose.model('Station', StationSchema);
