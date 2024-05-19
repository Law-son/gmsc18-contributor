const contributionModel = require('../models/contribution.model');

class ContributionServices {
    //function to store contribution details into database
    static async storeContribution(fullName, email, phoneNumber, amount, currentMonth, currentYear, currentDate) {
        const contribution = new contributionModel({ fullName, email, phoneNumber, amount, currentMonth, currentYear, currentDate });
        return await contribution.save();
    }

    //function to fetch contribution from database
    static async fetchContributions() {
        try {
            const contribution = contributionModel.find();
            return contribution;
        } catch (error) {
            console.error("Error fetching contributions:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = ContributionServices;

