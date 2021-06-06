
import './App.css';

import "react-datepicker/dist/react-datepicker.css";

//components
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";


function App() {


  return (
    <div className="App">
      <Navbar />
      <LoginForm />

    </div>
  );
}

export default App;
