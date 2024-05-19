const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const contributorsSchema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
      type: String,
    },
    amount: {
        type: Number,
    },
    currentMonth: {
        type: String,
    },
    currentYear: {
        type: String,
    },
    currentDate: {
        type: String,
    }
}, {timestamps: false});

const contributorsModel = db.model('contributors', contributorsSchema);

module.exports = contributorsModel;
