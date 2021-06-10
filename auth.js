const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}


exports.generateAccessToken = generateAccessToken;