const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    
    exercise: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    sets: {
        type: Number,
        required: true
    },

    reps: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);