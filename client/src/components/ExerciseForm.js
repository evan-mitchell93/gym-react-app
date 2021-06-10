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
            <form onSubmit={submitHandler} className="w3-container w3-left-align w3-padding-16 w3-border-red">
                <input className="w3-input" value={userInput[0].name} name="name" type="text" onChange={changeHandler} placeholder="Enter Exercise Name" />
                <label className="w3-left-align">Exercise</label>
                <input className="w3-input" value={userInput[0].sets} name="sets" type="number" onChange={changeHandler} />
                <label>Sets</label>
                <input className="w3-input" value={userInput[0].reps} name="reps" type="number" onChange={changeHandler} />
                <label>Reps</label>
                <input className="w3-input" value={userInput[0].startWeight} name="startWeight" onChange={changeHandler} type="number" />
                <label>Staring Weight</label>
                <button className="w3-btn w3-teal w3-input w3-section">Add Exercise</button>
                
            </form>
        </div>
    );
};

export default ExerciseForm;