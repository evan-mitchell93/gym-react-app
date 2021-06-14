import React from "react";
import Exercise from "./Exercise";

const ExerciseList = ({exerciseList}) => {
    return (
        <div className="w3-container w3-panel">
            {exerciseList.map((exercise, index) => {

                return (
                    <div key={index} className="w3-panel w3-border w3-border-black">
                        <Exercise exercise={exercise} />
                    </div>
                )
                }
            ).filter(ex => ex.exercise != "")}
        </div>
    );
};

export default ExerciseList;