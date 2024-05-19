const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const paymentDetailsSchema = new Schema({
    reference: {
        type: String,
    },
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
}, {timestamps: true});

const paymentDetailsModel = db.model('paymentDetails', paymentDetailsSchema);

module.exports = paymentDetailsModel;
