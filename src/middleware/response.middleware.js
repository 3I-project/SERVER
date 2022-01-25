const HTTP_UTIL = require('../utils/http.util');

module.exports = (req, res, next) => {
    res.success = (statusCode, payload) => {
        HTTP_UTIL.success(res, statusCode, payload);
    }

    res.httpError = (statusCode, payload) => {
        HTTP_UTIL.error(res, statusCode, payload);
    }

    return next();
}
