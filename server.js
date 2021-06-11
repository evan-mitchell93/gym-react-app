//express set up
const express = require('express');
const app = express();
const port = process.env.PORT || 4999;

//database set up
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pyuser:Son22arc2@hpgamecraft.xjnnt.mongodb.net/Gym?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
() => console.log("connected to db"));


//auth functions

 const auths = require('./auth');


//db schemas
const User = require("./model/User");
const Exercise = require("./model/ExerciseModel");

//json
app.use(express.json());


const util = require('util');
const cors = require('cors');
const session = require('express-session');

app.use(session({
    secret: 'shhhhh',
    resave: true,
    saveUninitialized: true}))

app.use(cors({
    credentials: true
}))


const cookieParser = require('cookie-parser');


app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({express: 'your backend is connected'});
});

//get exercise
app.post('/exercise', async (req, res) =>{
    const userDate = new Date(req.body.date);
    console.log(userDate);
    const foundExercise = await Exercise.find({date: userDate});
    res.send(foundExercise);
})

//login attempt
app.post('/login', async (req, res) => {

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
app.post('/register', async (req, res) =>{

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