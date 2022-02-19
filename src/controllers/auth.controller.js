const { tokenService } = require('../services/token.service');
const { AuthService } = require('../services/auth.service');
const { OrganizationService } = require('../services/organization.service')

class AuthController {
  async refreshTokens(req, res) {
    const { refresh } = req.cookies;

    // console.log(refresh);

    if (!refresh) {
      res.status(400).json({
        status: false,
        msg: 'refresh token missing'
      })
    }

    const token = await tokenService.verifyRefreshToken(refresh);

    // console.log(token)

    if (!Object.keys(token).length) {
      res.status(401).json({
        status: false,
        msg: 'Invalid token'
      })
    }

    const type = token?.id_employee ? 'employee' : 'organization'

    if (Date.now() > token.exp) {
      const user = await AuthService.getUserByLogin(token.login, type);

      const tokens =  tokenService.generateTokens(user, type);

      res.status(200).json({
        status: true,
        tokens
      })
    } else {
      res.status(200).json({
        status: false,
        msg: 'refresh token exp - OK'
      })
    }
  }

  async authorization (req, res) {
    try {
      const { type } = req.body;
      const { login, password } = req.body.data;

      const user = await AuthService.checkUser(login, password, type);

      if (!user) {
        throw new Error('Неверный логин или пароль');
      }

      const tokens =  tokenService.generateTokens(user, type);

      res.status(200).send({
        status: true,
        tokens: tokens
      });
    } catch(err) {
      res.status(400  ).json({
        status: false,
        msg: err.message
      })
    }
  }

  async registration(req, res) {
    const typeRegistration = req.body.type;
    const registartionData = req.body.data;

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
        res.status(400).json({
          status: false,
          msg: err.message
        });
      }
    }
  }

  async getMe (req, res) {
    let user = null;
    let profilePayload = {};

    const { login } = req.tokenPayload;

    if (req.tokenPayload.id_employee) {
      user = await AuthService.getUserByLogin(login, 'employee');
      const organization = await OrganizationService.getOrganizationById(user.id_organization);
      // console.log(user.id_organization, organization)
      profilePayload = {
        type: 'employee',
        id_employee: user.id_employee,
        id_organization: user.id_organization,
        organization: {
          name: organization.name,
          address: organization.address,
          reg_date: organization.reg_date
        },
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isLeader: user.isLeader,
        avatarUrl: user.avatarHash,
        reg_date: user.reg_date,
      }
    } else {
      user = await AuthService.getUserByLogin(login, 'organization');

      profilePayload = {
        type: 'organization',
        id_organization: user.id_organization,
        name: user.name,
        address: user.address,
        avatarUrl: user.avatarHash,
        reg_date: user.reg_date,
      }
    }

    if (!user) {
      res.status(400).json({
        status: false,
        msg: 'Нет отсутствуеут'
      });
    }

    res.status(200).json({
      status: true,
      profile: profilePayload
    });
  }

  async checkEmail(req, res) {
    const {email, type} = req.body;

    if (!email || !type) {
      return res.httpError(400, {
        message: 'Bad request'
      })
    }

    const isEmailExist = await AuthService.getUserByEmail(email, type)
    
    if (isEmailExist) {
      return res.success(200, {
        isFree: false
      })
    }

    return res.success(200, {
      isFree: true
    })
  }

  async checkLogin(req, res) {
    const {login, type} = req.body;

    if (!login || !type) {
      return res.httpError(400, {
        message: 'Bad request'
      })
    }

    const isLoginExist = await AuthService.getUserByLogin(login, type)
    
    // console.log(isLoginExist)

    if (isLoginExist) {
      return res.success(200, {
        isFree: false
      })
    }

    return res.success(200, {
      isFree: true
    })
  }
}

module.exports.authController = new AuthController();
