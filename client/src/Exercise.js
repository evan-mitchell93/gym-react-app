import React from "react";

const Exercise = ({exercise}) => {
    return (
        <div>
            <h3>{exercise.name}</h3>
            <h5>Sets: {exercise.sets}</h5>
            <h5>Reps Per Set: {exercise.reps}</h5>
            <h5>Starting Weight: {exercise.startWeight} lbs</h5>
        </div>
    );
};

export default Exercise