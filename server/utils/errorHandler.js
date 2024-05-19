function sendErrorResponse(res, status, message) {
    res.status(status).json({
        status: false,
        error: message
    });
}

module.exports = { sendErrorResponse };