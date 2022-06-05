const jwt = require('jsonwebtoken');

class TokenService {

  generateTokens(user, type) {
    const payload = {
      id_employee: user?.id_employee,
      id_organization: user.id_organization,
      login: user.login
    }

    const access_token = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {
        expiresIn: '5h'
      }
    );

    const refresh_token = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {
        expiresIn: '1d'
      }
    );

    return {
      access_token,
      refresh_token
    };
  }

  verifyAccessToken(access_token) {
    try {
      return jwt.verify(access_token, process.env.ACCESS_PRIVATE_KEY);
    } catch (e) {
      return null
    }
  }

  verifyRefreshToken(refresh_token) {
    try {
      return jwt.verify(refresh_token, process.env.REFRESH_PRIVATE_KEY);
    } catch (e) {
      return null
    }
  }
}

module.exports.tokenService = new TokenService();
