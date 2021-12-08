const jwt = require('jsonwebtoken');

class TokenService {

  generateTokens(user, type) {
    const payload = {
      id_employee: user?.id_employee,
      id_organization: user.id_organization,
      login: user.login
    }

    const access_token = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {
        expiresIn: '2h'
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
    const payload = jwt.verify(access_token, process.env.ACCESS_PRIVATE_KEY);

    return payload;
  }

  verifyRefreshToken(refresh_token) {
      const payload = jwt.verify(refresh_token, process.env.REFRESH_PRIVATE_KEY);

      return payload;
  }
}

module.exports.tokenService = new TokenService();
