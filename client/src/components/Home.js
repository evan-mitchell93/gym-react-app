import React, {useState} from 'react';

import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";

import data from "../exercises.json";



const Home = () => {
      //state for choosing a date
  const [startDate, setStartDate] = useState(new Date());

  const addExercise = (input) =>{
    let copy = [...exerciseList];
    copy = [...copy, {name:input[0].name, sets:input[0].sets, reps:input[0].reps, startWeight:input[0].startWeight}];
    setExerciseList(copy);
  }


  const getDate = () => {
    console.log("Getting things");
    fetch("/exercise/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date: startDate})
    }).then((result) => {
      const r = result.json();
      console.log(r);
    }).catch((err) =>{
      console.log(err);
    });
  }

  const changeDate = (e) =>{
    e.preventDefault();
    setStartDate(e.target.value);
  }
  
  //state for storing the list of exercises for the date
  const [exerciseList, setExerciseList] = useState(data);

    return (
        <div>
            <div className="w3-container  w3-amber w3-padding-16">
                <h4>Select Date</h4>
                <input type="date" onChange={changeDate}></input>
                <button className="w3-btn w3-teal" onClick={getDate}>Get Exercises</button>
            </div>
        <ExerciseList exerciseList={exerciseList} />
        <ExerciseForm addExercise={addExercise} />
      </div>
    )
}

export default Home;