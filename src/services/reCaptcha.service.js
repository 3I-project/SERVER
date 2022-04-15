const axios = require("axios").default;

class ReCaptcha {
    async varifyToken(token) {
        try {
            const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', 
            {
                params: {
                    secret: process.env.CAPTCHA_SECRET_KEY,
                    response: token
                }    
            })

            return response;
        } catch (error) {
            return error;
        }
    }
}

module.exports.reCaptchaService = new ReCaptcha();