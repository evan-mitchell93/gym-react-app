const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

const verifyToken = (token) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err) =>{
        if(err){
            return false;
        }
        else{
            return true;
        }
    })
}


exports.generateAccessToken = generateAccessToken;
exports.verifyToken = verifyToken;