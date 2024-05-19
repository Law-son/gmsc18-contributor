require('dotenv').config();
const PaymentDetailsServices = require('./paymentDetails.services');
const { getMobileProvider } = require('../utils/providerFinder');
const axios = require('axios');

const Paystack = require('paystack')(process.env.secretKey);

class PaymentServices {

    static async makePayment(paymentData) {
        const provider = getMobileProvider(paymentData.phoneNumber);
        return new Promise(async (resolve, reject) => {
            try {
                Paystack.transaction.initialize({
                    email: paymentData.email,
                    amount: paymentData.amount * 100,
                    currency: "GHS",
                    channels: ['mobile_money'],
                    mobile_money: {
                        phone: paymentData.phoneNumber,
                        provider: provider
                    }
                }, async function (error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        // Check if body.data exists and has the expected structure
                        if (body && body.data && body.data.reference) {
                            const reference = body.data.reference;
                            const paymentDetails = await PaymentDetailsServices.storePaymentDetails(reference, paymentData.fullName, paymentData.email, paymentData.phoneNumber, paymentData.amount, paymentData.currentMonth, paymentData.currentYear, paymentData.currentDate);
                            resolve(body); // Resolve the promise with the entire body
                        } else {
                            console.error('Invalid response structure from Paystack');
                            reject(new Error('Invalid response structure from Paystack'));
                        }
                    }
                });
            } catch (error) {
                console.error('Error making payment.', error);
                reject(error);
            }
        });
    }
}

module.exports = PaymentServices;
