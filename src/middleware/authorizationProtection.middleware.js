const {tokenService} = require("../services/token.service");

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            res.status(401).json({
                status: false,
                msg: "Missing token"
            })
        }

        req.tokenPayload = tokenService.verifyAccessToken(token);
        return next()
    } catch (err) {
        return res.status(401).json({
            status: false,
            msg: err.message
        })
    }
}
