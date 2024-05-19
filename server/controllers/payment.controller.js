const PaymentServices = require('../services/payment.services');
const { sendErrorResponse } = require('../utils/errorHandler');

// Function to make payment to the contribution account
exports.makePayment = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, amount, currentMonth, currentYear, currentDate } = req.body;
        const paymentData = {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            amount: amount,
            currentDate: currentDate,
            currentMonth: currentMonth,
            currentYear: currentYear
        };

        const payment = await PaymentServices.makePayment(paymentData);

        if (!payment) {
            return sendErrorResponse(res, 500, 'Error making payment');
        }

        res.json({ status: true, success: payment });
    } catch (error) {
        next(error);
    }
};
