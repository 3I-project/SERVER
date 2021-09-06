const { tokenService } = require('../Services/token.service');
const { authService } = require('../Services/auth.service');

class AuthController {
  authorization (req, res) {
    const tokens =  tokenService.genarateTokens();

    res.status(200).send(tokens);
  }

  registration(req, res) {
    res.status(200).send({
      msg: 'Вы успешно зарегистрированы'
    })
  }
}

module.exports.authController = new AuthController();