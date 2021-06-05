
import './App.css';

import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import data from "./exercises.json";

//components
import ExerciseList from "./ExerciseList";
import ExerciseForm from "./ExerciseForm";

function App() {
  const [message, setMessage] = useState("");

  //testing backend connectivity
  const callAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    setMessage(body.express);
  }

  //state for choosing a date
  const [startDate, setStartDate] = useState(new Date());

  //state for storing the list of exercises for the date
  const [exerciseList, setExerciseList] = useState(data);



  const addExercise = (input) =>{
    let copy = [...exerciseList];
    copy = [...copy, {name:input[0].name, sets:input[0].sets, reps:input[0].reps, startWeight:input[0].startWeight}];
    setExerciseList(copy);
  }

  return (
    <div className="App">
      <h1 onClick={callAPI}>Hello {message}</h1>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <ExerciseList exerciseList={exerciseList} />
      <ExerciseForm addExercise={addExercise} />
    </div>
  );
}

export default App;
