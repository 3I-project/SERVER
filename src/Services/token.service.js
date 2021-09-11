const jwt = require('jsonwebtoken');

class TokenService {

  genarateTokens() {
    const payload = {
      login: 'TankistPro'
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
    try {
      const payload = jwt.verify(refresh_token, process.env.REFRESH_PRIVATE_KEY);

      return payload;
    } catch(err) {
      return new Error('Token is not valid');
    }
  }
}

module.exports.tokenService = new TokenService();