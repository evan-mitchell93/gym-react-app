import React from "react";
import Exercise from "./Exercise";

const ExerciseList = ({exerciseList, removeExercise}) => {
    const delHandler = (e) =>{
        e.preventDefault();
        let idx = e.target.getAttribute('passedIdx');
        //console.log(exerciseList);
        removeExercise(idx);
    }
    return (
        <div className="w3-row">
            {exerciseList.map((exercise, index) => {
                if(exercise.exercise === ""){
                    return;
                }
                return (
                    <div key={index} className="w3-panel w3-half">
                        <Exercise exercise={exercise} idx={index} />
                        <button passedIdx={index} onClick={delHandler}>Delete</button>
                    </div>
                )
                }
            )}
        </div>
    );
};

export default ExerciseList;