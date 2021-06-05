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


const User = require("./model/User");

//json
app.use(express.json());

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({express: 'your backend is connected'});
});


app.post('/login', async (req, res) => {

    const found = await User.findOne({userName: req.body.userName});
    console.log(found);
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