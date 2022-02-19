module.exports.success = (res, statusCode, payload) => {
    return res.status(statusCode).json({
        status: true,
        statusCode,
        payload
    });
}

module.exports.error = (res, statusCode, payload) => {
    return res.status(statusCode).json({
        status: false,
        statusCode,
        payload
    });
}
