const {tokenService} = require("../services/token.service");

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                status: false,
                msg: "Missing token"
            })
        }

        req.tokenPayload = tokenService.verifyAccessToken(token);

        if (!req.tokenPayload) {
            return res.status(401).json({
                status: false,
                msg: "Token not valid"
            })
        }

        return next()
    } catch (err) {
        return res.status(401).json({
            status: false,
            msg: err.message
        })
    }
}
