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
        <form onSubmit={submitHandler}>
            <input value={userInput[0].name} name="name" type="text" onChange={changeHandler} placeholder="Enter Exercise Name" />
            <label for="name">Exercise</label>
            <input value={userInput[0].sets} name="sets" type="number" onChange={changeHandler} />
            <label for="sets">Sets</label>
            <input value={userInput[0].reps} name="reps" type="number" onChange={changeHandler} />
            <label for="reps">Reps</label>
            <input value={userInput[0].startWeight} name="startWeight" onChange={changeHandler} type="number" />
            <label for="startWeight">Staring Weight</label>
            <button>Add Exercise</button>
        </form>
    );
};

export default ExerciseForm;