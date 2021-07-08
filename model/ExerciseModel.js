const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    
    exercises: [{exercise: String, sets: Number, setWeights: Array, reps: Array}]

});

module.exports = mongoose.model("Exercise", ExerciseSchema);