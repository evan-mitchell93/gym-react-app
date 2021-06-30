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

//json
app.use(express.json());


const util = require('util');
const cors = require('cors');
<<<<<<< Updated upstream

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

=======
>>>>>>> Stashed changes

app.use(cors({
    credentials: true
}))


<<<<<<< Updated upstream
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
=======
const cookieParser = require('cookie-parser');


//router testing
var exerciseRouter = require('./api/exercise');
var userRouter = require('./api/users');
>>>>>>> Stashed changes

app.use(exerciseRouter);
app.use(userRouter);


app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({express: 'your backend is connected'});
});