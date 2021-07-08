import React, {useState} from "react";

const ExerciseForm = ({addExercise}) =>{

    const [userInput, setInput] = useState([{"exercise":"", "sets":1, "setWeights": [0], "reps": [0]}]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(userInput[0].exercise !== ""){
            addExercise(userInput);
            setInput([{"exercise":"", "sets":1, "setWeights": [0], "reps": [0]}]);
        }
    };

    const changeHandler = (e) =>{

        console.log("name " + e.target.name + " index? " + e.target.getAttribute('passedkey'));
        let val = e.target.value;
        let tmp = [...userInput];
        tmp[0][e.target.name] = val;
        if(e.target.name === "sets"){
            //if number of sets increases add entry to array
            if(parseInt(val) > tmp[0]["setWeights"].length){
                //get the difference in size and concat array of that size to the original
                let difference = parseInt(val) - tmp[0]["setWeights"].length;
                tmp[0]["setWeights"] = tmp[0]["setWeights"].concat(Array(difference).fill(0));
                tmp[0]["reps"] = tmp[0]["reps"].concat(Array(difference).fill(0));

                console.log(tmp[0]["setWeights"]);
            }

            //if number of sets decreases remove that many entries from the array
            else{
                let difference = parseInt(val) - tmp[0]["setWeights"].length;
                tmp[0]["setWeights"].splice(difference);
                tmp[0]["reps"].splice(difference);
            }
        }

        if(e.target.name === "setWeight"){
            tmp[0]["setWeights"][parseInt(e.target.getAttribute('passedkey'))] = val;
        }

        if(e.target.name === "repNumber"){
            let indx = (parseInt(e.target.getAttribute('passedkey')) - 100)/2;
            tmp[0]["reps"][indx] = val;
        }
        setInput(tmp);
    };


    return(
        <div>
            <div className="w3-container w3-amber">
                <h2>Add Exercise</h2>
            </div>
            <form onSubmit={submitHandler} className="w3-container w3-left-align w3-padding-16 w3-border-red">
                <input className="w3-input" value={userInput[0].exercise} name="exercise" type="text" onChange={changeHandler} placeholder="Enter Exercise Name" />
                <label className="w3-left-align">Exercise</label>
                <input className="w3-input" value={userInput[0].sets} name="sets" type="number" onChange={changeHandler} />
                <label>Sets</label>
                {userInput[0].setWeights.map((set, index) =>(
                    <div className="w3-row-padding">
                        <div className="w3-half">
                            <input key={index} passedkey={index} className="w3-input" value={userInput[0].setWeights[index]} name="setWeight" onChange={changeHandler}></input>
                            <label>weight</label>
                        </div>
                        <div className="w3-half">
                        <input key={(index * 2) + 100} passedkey={(index * 2) + 100} className="w3-input" value={userInput[0].reps[index]} name="repNumber" onChange={changeHandler}></input>
                            <label>reps</label>
                        </div>
                    </div>
                ))}
                <button className="w3-btn w3-teal w3-input w3-section">Add Exercise</button>
                
            </form>
        </div>
    );
};

export default ExerciseForm;