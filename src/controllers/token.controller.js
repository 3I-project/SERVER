const {tokenService} = require("../services/token.service");

class TokenController {
    validateToken (req, res) {
        const { token } = req.body;

        if (!token) {
            return res.httpError(400, {
                msg: 'Bad request'
            })
        }

        const userPayload = tokenService.verifyAccessToken(token);

        if (!userPayload) {
            return res.httpError(400, {
                isValid: false
            })
        }

        const {id_employee, id_organization, login} = userPayload

        return res.success(200, {
            isValid: true,
            payload: {
                id_employee,
                id_organization,
                login
            }
        })
    }
}

module.exports.TokenController = new TokenController();
