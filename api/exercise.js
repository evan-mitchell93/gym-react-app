var express = require('express');
var router = express.Router();

//db schemas
const User = require("../model/User");
const Exercise = require("../model/ExerciseModel");

//get exercise
router.get('/exercise', async (req, res) =>{
    //set date and hours for consistency
    const userDate = new Date(req.query.date);
    userDate.setHours(0,0,0);

    console.log(userDate);

    Exercise.find({date: userDate}, (err, Exercises) =>{

        //no entry for date create Exercise doc
        if(!Exercises.length) {
            emptyResponse = [new Exercise({
                date: userDate,
                exercises: [{"id": "0", "exercise": "", "sets": 0, "setWeights": [0], "reps": [0]}]
            })];
            res.json(emptyResponse);
        }
        else{
            res.json(Exercises);
        }
    });
});

router.post('/exercise/', async (req,res) => {

    //set date and hours for consistency
    const userDate = new Date(req.query.date);
    userDate.setHours(0,0,0);

    //check if there is a doc associated with the given date
    const foundDate = await Exercise.findOne({date: userDate});

    //if no doc exists, create new Exercise save it to db
    if(!foundDate){

        const saveData = new Exercise({
            date: userDate,
            exercises: req.body.exerciseList
        });
        const saved = await saveData.save();
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

module.exports = router;