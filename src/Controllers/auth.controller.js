const { tokenService } = require('../Services/token.service');
const { AuthService } = require('../Services/auth.service');

const ApiError = require('../Exeptions/exeption');

class AuthController {
  async authorization (req, res) {
    try {
      const { type } = req.body;
      const { login, password } = req.body.data;

      const user = await AuthService.getUser(login, password, type);

      if (!user) {
        throw new Error('Неверный логин или пароль');
      }

      const tokens =  tokenService.generateTokens(user, type);

      res.status(200).send({
        status: true,
        tokens: tokens
      });
    } catch(err) {
      res.status(401).json({
        status: false,
        msg: err.message
      })
    }
  }

  async registration(req, res) {
    const typeRegistration = req.body.type;
    const registartionData = req.body.data;

    if(!typeRegistration || !registartionData) {
      throw ApiError.BadRequest('1')
    }

    if(typeRegistration === 'employee') {
      try {
        await AuthService.registrationEmployee(registartionData);

        res.status(200).json({
          status: true,
          msg: 'Пользователь успешно создан'
        })
      } catch(err) {
        res.status(401).json({
          status: false,
          msg: err.message
        })
      }
    } else if (typeRegistration === 'organization') {
      try {
        await AuthService.registrationOrganization(registartionData);

        res.status(200).json({
          status: true,
          msg: 'Организация успешно зарегистрирована в системе'
        })
      } catch (err) {
        res.status(401).json({
          status: false,
          msg: err.message
        });
      }
    }
  }
}

module.exports.authController = new AuthController();
