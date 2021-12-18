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

        const userPayload = tokenService.verifyAccessToken(token);

        req.tokenPayload = userPayload;
        return next()
    } catch (err) {
        return res.status(401).json({
            status: false,
            msg: err.message
        })
    }
}
