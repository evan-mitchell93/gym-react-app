import React from 'react';

import LoginForm from "./LoginForm";

import {BrowserRouter as Router,
        Switch,
        Route,
        Link 
      } from "react-router-dom";


import Home from "./Home";

const Navbar = () =>{

    return(
        <div>
            <Router>
                <div class="w3-bar w3-amber w3-left-align">
                    <Link to="/"><button class="w3-btn w3-amber">Blank</button></Link>
                    <Link to="/Home"><button class="w3-btn w3-amber">Home</button></Link>
                </div>
                <Switch>
                    <Route path="/Home">
                        <Home />
                    </Route>
                </Switch>
            </Router>

            <LoginForm />
        </div>
    )
}

export default Navbar