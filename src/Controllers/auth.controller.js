const { tokenService } = require('../Services/token.service');
const { AuthService } = require('../Services/auth.service');

const ApiError = require('../Exeptions/exeption');

class AuthController {
  authorization (req, res) {
    const tokens =  tokenService.genarateTokens();

    res.status(200).send(tokens);
  }

  async registration(req, res) {
    const typeRegistration = req.body.type;
    const registartionData = req.body.data;

    if(!typeRegistration) throw ApiError.BadRequest('Отсутствует тип регистрации');
    if(!registartionData) throw ApiError.BadRequest('Данные отсутствуют');

    if(typeRegistration === 'employee') {
      try {
        await AuthService.registrationEmployee(registartionData);

        res.status(200).json({
          status: true, 
          msg: 'Пользователь успешно создан!'
        })
      } catch(err) {
        res.status(401).json({
          status: false, 
          msg: err.message
        })
      }
    } else if (typeRegistration === 'organization') {
      AuthService.registrationOrganization(registartionData)
    }
  }
}

module.exports.authController = new AuthController();