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

//router testing
var exerciseRouter = require('./api/exercise');
var userRouter = require('./api/users');

app.use(exerciseRouter);
app.use(userRouter);
