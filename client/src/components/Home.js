import React, {useState, useEffect} from 'react';

import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";




const Home = () => {
      //state for choosing a date
  const [startDate, setStartDate] = useState(new Date());
  const [exerciseList, setExerciseList] = useState([]);
  const [renderCopy, setRenderCopy] = useState([]);

  //add a new exercise to the list
  const addExercise = (input) =>{
    let copy = [...renderCopy];
    //append the new exercise data to current list of exercises
    copy = [...copy, {exercise:input[0].exercise, sets:input[0].sets,setWeights:input[0].setWeights, reps:input[0].reps}];
    setRenderCopy(copy);
    setExerciseList(copy)
    console.log(exerciseList[0]);
  }

  useEffect (()=>{
    fetch(`/exercise?date=${startDate.toString()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({exerciseList})
    }).then((resut) =>{
    }).catch((err) =>{
      console.log(err);
    })
  }, [exerciseList])



  const getDate = () => {
    //get array of all exercies from a given date
    fetch(`/exercise?date=${startDate.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.json()

    }).then((list) =>{
      //set copy of exercises
      setRenderCopy(list[0].exercises);

    }).catch((err) =>{
      console.log(err);
    });
  }

  //udapte the chosen date
  const changeDate = (e) =>{
    e.preventDefault();
    setStartDate(e.target.value);
  }
  
  //state for storing the list of exercises for the date

    return (
        <div>
            <div className="w3-container  w3-amber w3-padding-16">
                <h4>Select Date</h4>
                <input type="date" onChange={changeDate} placeholder="dd-mm-yyyy" className="w3-input"></input>
                <button className="w3-btn w3-teal" onClick={getDate}>Get Exercises</button>
            </div>
        <ExerciseList exerciseList={renderCopy} />
        <ExerciseForm addExercise={addExercise} />
      </div>
    )
}

export default Home;