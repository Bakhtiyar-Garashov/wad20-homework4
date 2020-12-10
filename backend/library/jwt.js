const JsonWebToken = require('jsonwebtoken');

const SECRET = '3gJhqIYcMPHE60DoOUkvzLM6WDjOTzE4';

const jwt = {//Create and veirfy tokens.
    createAccessToken: (payload) => {
        return JsonWebToken.sign(payload, SECRET, {
            algorithm: "HS256",
            expiresIn: 600 //10 minutes
        });
    },
    verifyAccessToken: (token) => {
        try {
            return JsonWebToken.verify(token, SECRET);
        } catch (err) {
            return false;
        }
    },
    decodeAccessToken: (token) => {
        try {
            return JsonWebToken.decode(token, SECRET);
        } catch (err) {
            return false
        }
    }
};

module.exports = jwt;