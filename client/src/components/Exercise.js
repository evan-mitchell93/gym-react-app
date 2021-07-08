import React from "react";

const Exercise = ({exercise}) => {
    return (
        <div>
            <h3>{exercise.exercise}</h3>
            <h5>Sets: {exercise.sets}</h5>
            {exercise.setWeights.map((weight, index) => (
                <p>Weight: {weight} lbs, Reps: {exercise.reps[index]} </p>
            ))}
        </div>
    );
};

export default Exercise