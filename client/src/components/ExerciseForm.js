import React, {useState} from "react";

const ExerciseForm = ({addExercise}) =>{

    const [userInput, setInput] = useState([{"name":"", "sets":0, "reps": 0, "startWeight":0 }]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(userInput[0].name !== ""){
            addExercise(userInput);
            setInput([{"name":"", "sets":0, "reps": 0, "startWeight":0 }]);
        }
    };

    const changeHandler = (e) =>{
        let val = e.target.value;
        let tmp = [...userInput];
        tmp[0][e.target.name] = val;
        setInput(tmp);
    };


    return(
        <div>
            <div class="w3-container w3-amber">
                <h2>Add Exercise</h2>
            </div>
            <form onSubmit={submitHandler} class="w3-container w3-left-align w3-padding-16 w3-border-red">
                <input class="w3-input" value={userInput[0].name} name="name" type="text" onChange={changeHandler} placeholder="Enter Exercise Name" />
                <label class="w3-left-align">Exercise</label>
                <input class="w3-input" value={userInput[0].sets} name="sets" type="number" onChange={changeHandler} />
                <label for="sets">Sets</label>
                <input class="w3-input" value={userInput[0].reps} name="reps" type="number" onChange={changeHandler} />
                <label for="reps">Reps</label>
                <input class="w3-input" value={userInput[0].startWeight} name="startWeight" onChange={changeHandler} type="number" />
                <label for="startWeight">Staring Weight</label>
                <button class="w3-btn w3-teal w3-input w3-section">Add Exercise</button>
                
            </form>
        </div>
    );
};

export default ExerciseForm;