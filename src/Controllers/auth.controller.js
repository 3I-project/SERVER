const { tokenService } = require('../Services/token.service');
const { AuthService } = require('../Services/auth.service');

const ApiError = require('../Exeptions/exeption');

class AuthController {
  authorization (req, res) {
    const tokens =  tokenService.genarateTokens();

    res.status(200).send(tokens);
  }

  registration(req, res) {
    const typeRegistration = req.body.type;
    const registartionData = req.body.data;

    if(!typeRegistration) throw ApiError.BadRequest('Bad Request');

    if(typeRegistration === 'employee') {
      AuthService.registrationEmployee(registartionData)
    } else if (typeRegistration === 'organization') {
      AuthService.registrationOrganization(registartionData)
    }
    
    res.status(200).send(typeRegistration);
  }
}

module.exports.authController = new AuthController();