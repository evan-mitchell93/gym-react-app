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


const User = require("./model/User");

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

app.post('/register', async (req, res) =>{
    const newuser = new User({
        userName: req.body.userName,
        password: req.body.password
    });

    try{
        const savedUser = await newuser.save();
        res.json({error: null, msg: "successful"});
    }
    catch (error) {
        res.status(400).json({error});
    }
})