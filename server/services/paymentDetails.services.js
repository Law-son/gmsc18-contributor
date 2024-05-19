const paymentDetailsModel = require('../models/paymentDetails.model');

class PaymentDetailsServices {
    //function to store payment details into database
    static async storePaymentDetails(reference, fullName, email, phoneNumber, amount, currentMonth, currentYear, currentDate) {
        const paymentDetail = new paymentDetailsModel({ reference, fullName, email, phoneNumber, amount, currentMonth, currentYear, currentDate });
        return await paymentDetail.save();
    }
}

module.exports = PaymentDetailsServices;

