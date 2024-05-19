const ContributionServices = require('../services/contribution.services');
const { sendErrorResponse } = require('../utils/errorHandler');


// Function to fetch all contributions made
exports.fetchContributions = async (req, res, next) => {
    try {

        const contributions = await ContributionServices.fetchContributions();

        if (!contributions) {
            return sendErrorResponse(res, 500, 'Error fetching contributions');
        }

        res.json({ status: true, success: contributions });
    } catch (error) {
        next(error);
    } 
}; 

 