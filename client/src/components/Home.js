import React, {useState} from 'react';

import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";
import DatePicker from "react-datepicker";

import data from "../exercises.json";

const Home = () => {
      //state for choosing a date
  const [startDate, setStartDate] = useState(new Date());

  const addExercise = (input) =>{
    let copy = [...exerciseList];
    copy = [...copy, {name:input[0].name, sets:input[0].sets, reps:input[0].reps, startWeight:input[0].startWeight}];
    setExerciseList(copy);
  }


  const getDate = (date) => {
    console.log(date);
  }
  //state for storing the list of exercises for the date
  const [exerciseList, setExerciseList] = useState(data);

    return (
        <div>
            <div className="w3-container  w3-amber w3-padding-16">
                <h4>Select Date</h4>
                <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); getDate(startDate)}} />
            </div>
        <ExerciseList exerciseList={exerciseList} />
        <ExerciseForm addExercise={addExercise} />
      </div>
    )
}

export default Home;