const paymentDetailsModel = require('../models/paymentDetails.model');
const crypto = require('crypto');
const ContributionServices = require('../services/contribution.services');

exports.handlePaystackCallback = async (req, res) => {
    try {
        const payload = req.body;

        const paystackSignature = req.headers['x-paystack-signature'];
        const secretKey = process.env.secretKey;

        const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(payload)).digest('hex');
        if (hash !== paystackSignature) {
            console.error('Invalid Paystack signature');
            return res.status(401).send('Invalid Paystack signature');
        }

        const event = payload.event;

        switch (event) {
            case 'charge.success':
                console.log('Payment was successful');

                const reference = payload.data.reference;
                // console.log('Payment reference:', reference);

                try {
                    const paymentDetails = await paymentDetailsModel.findOne({ reference: reference });
                    if (!paymentDetails) {
                        console.error('Payment details not found for reference:', reference);
                        return res.status(404).send('Payment details not found');
                    }

                    try {

                        contribution = ContributionServices.storeContribution(paymentDetails.fullName, paymentDetails.email, paymentDetails.phoneNumber, paymentDetails.amount, paymentDetails.currentMonth, paymentDetails.currentYear, paymentDetails.currentDate);

                    } catch (err) {
                        console.error('Error handling successful payment:', err);
                        return res.status(500).send('Error handling successful payment');
                    }

                    await paymentDetailsModel.deleteOne({ reference: reference });
                    return res.status(200).send('Payment successful');
                } catch (error) {
                    console.error('Error handling successful payment:', error);
                    return res.status(500).send('Error handling successful payment');
                }

            case 'charge.failure':
                console.log('Payment failed');

                const ref = payload.data.reference;
                // console.log('Payment reference:', reference);

                const details_ = await paymentDetailsModel.findOne({ reference: ref });
                if (!details_) {
                    console.error('Payment details not found for reference:', reference);
                    return res.status(404).send('Payment details not found');
                }

                const message = `Dear ${details_.fullName},
                Our system noticed that you attempted to make a payment for GMSC '18 contribution. However, our system did not process your payment. This may have been due to a network interruption or if you canceled the payment yourself.
                You can visit our website and try making payment again if you're still interested. For any assistance, please don't hesitate to contact Lawson. Thank you.\n
                Regards,
                GMSC '18 \n`;

                const subject = "GMSC '18 Contribution Payment Not Processed!!!";

                let Email = await EmailServices.sendEmail(details_.email, details_.fullName, subject, message);

                if (!Email) {
                    return sendErrorResponse(res, 500, 'Error sending email');
                }
                return res.status(500).send('Payment failed');
                break;
            default:
                console.log(`Unsupported event type: ${event}`);
                break;
        }

        res.status(200).send('Webhook received successfully');
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error handling webhook');
    }
};
