var express = require('express');
var userRouter = express.Router();

const auths = require('../auth');

const User = require('../model/User');

//login attempt
userRouter.post('/login', async (req, res) => {

    let auth = req.headers["authorization"];

    if(!auth){
        return res.status(401).send({error: "auth required"});
    }
    else{

        var creds = auth.substring("Basic".length).trim().split(":");
        const userFound = await User.findOne({userName: creds[0]});

        if(userFound !== null && creds[1] == userFound.password){
            const token = auths.generateAccessToken(creds[0]);
            return res.cookie('jwt', token).status(200).send({msg: "Success"})
        }
        else{
            return res.status(403).send({msg: "wrong  username"})
        }
    }
});

//register attempt
userRouter.post('/register', async (req, res) =>{

    let auth = req.headers["authorization"];

    if(!auth) {
        return res.status(401).send({error: "auth required"});
    }

    else{
        var creds = auth.substring("Basic".length).trim().split(":");

        const newuser = new User({
            userName: creds[0],
            password: creds[1]
            
        });

        try{
            const existingUser = await User.findOne({userName: newuser.userName});
            if(existingUser){
               return res.status(409).json({error: "username taken"});
            }
        }
        catch (error) {
            return res.status(400).json({error});
        }
    
        try{
            const savedUser = await newuser.save();
             return res.json({error: null, msg: "successful"});
        }
        catch (error) {
            return res.status(400).json({error});
        }
    }
})

module.exports = userRouter;