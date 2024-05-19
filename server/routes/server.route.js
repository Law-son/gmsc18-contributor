const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const webhookController = require('../controllers/webhook.controller');
const contributorsController = require('../controllers/contribution.controller');

// make payment for contribution
router.post('/makePayment', paymentController.makePayment);

// callback webhook urll listening for paystack response
router.post('/webhook', webhookController.handlePaystackCallback);

// fetch all payments
router.get('/fetchPayments', contributorsController.fetchContributions);


module.exports = router;

//* Define the various routes to the server in this file
 