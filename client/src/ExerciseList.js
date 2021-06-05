import React from "react";
import Exercise from "./Exercise";

const ExerciseList = ({exerciseList}) => {
    return (
        <div>
            {exerciseList.map(exercise => {
                return (
                    <div>
                        <Exercise exercise={exercise} />
                    </div>
                )
            })}
        </div>
    );
};

export default ExerciseList;