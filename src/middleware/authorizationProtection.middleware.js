const {tokenService} = require("../Services/token.service");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({
                status: false,
                msg: "Missing token"
            })
        }

        const userPayload = tokenService.verifyAccessToken(token);
        console.log(userPayload)

        req.tokenPayload = userPayload;

        next()
    } catch (err) {
        res.status(401).json({
            status: false,
            msg: err.message
        })
    }
}
