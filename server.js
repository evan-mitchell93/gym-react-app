//express set up
const express = require('express');
const app = express();
const port = process.env.PORT || 4999;

const dotenv = require('dotenv');

dotenv.config();

//database set up
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(cors({
    credentials: true
}))


app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({express: 'your backend is connected'});
});

//get exercise
app.get('/exercise', async (req, res) =>{

    //verify access
    if(!auths.verifyToken(req.cookies['token']))
    {
        res.status(401);
    }
    else{
        //set date and hours for consistency
        const userDate = new Date(req.query.date);
        userDate.setHours(0,0,0);

        Exercise.find({date: userDate}, (err, Exercises) =>{

            //no entry for date create Exercise doc
            if(!Exercises.length) {
                emptyResponse = [new Exercise({
                    date: userDate,
                    exercises: [{"exercise": "", "sets": 0, "reps": 0, "weight": 0}]
                })];
                res.json(emptyResponse);
            }
            else{
                res.json(Exercises);
            }
        });
    }
});

app.post('/exercise/', async (req,res) => {

    //set date and hours for consistency
    const userDate = new Date(req.query.date);
    userDate.setHours(0,0,0);

    //check if there is a doc associated with the given date
    const foundDate = await Exercise.findOne({date: userDate});

    //if no doc exists, create new Exercise save it to db
    if(!foundDate){

        const saveDate = new Exercise({
            date: userDate,
            exercises: req.body.exerciseList
        });
        const saved = await saveDate.save();
    }
    else{
        Exercise.updateOne({date: userDate},
            {$set: {exercises: req.body.exerciseList}}, (err, docs) => {
                if(err){
                    res.status(409).send(err);
                }
                else{
                    res.status(200);
                }
            });
    }

    res.send({msg: 'OK'})
});

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