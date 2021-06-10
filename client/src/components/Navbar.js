import React, {useState} from 'react';

import LoginForm from "./LoginForm";

import AuthContext from '../contexts/AuthContext';

import {BrowserRouter as Router,
        Switch,
        Route,
        Link 
      } from "react-router-dom";


import PrivateRoute from './PrivateRoute';

import Home from "./Home";

const Navbar = () =>{
    const [auth, setAuth] = useState({isAuth: false});

    const toggleAuth = () => {
        setAuth(!auth.isAuth);
    }
    return(
        <div>
            <AuthContext.Provider value={{auth, toggleAuth}} >
            <Router>
                <div className="w3-bar w3-amber w3-left-align">
                    <Link to="/"><button className="w3-btn w3-amber">Blank</button></Link>
                    <Link to="/Home"><button className="w3-btn w3-amber">Home</button></Link>
                    <Link to="/Login"><button ClassName="w3-btn w3-amber">Login</button></Link>
                </div>
                <Switch>
                    <PrivateRoute component={Home} path="/Home"/>
                    <Route path="/Login">
                        <LoginForm />
                    </Route>
                </Switch>
            </Router>
            </AuthContext.Provider>
        </div>
    )
}

export default Navbar