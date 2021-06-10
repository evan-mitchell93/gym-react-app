import React, { Component, useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {

    const {auth, toggleAuth} = useContext(AuthContext);
    return (
        <Route {...rest} render={() => (
            auth === true ? <Component />
            : <Redirect to="/Login" />
        )} />
    );
    console.log(auth);
};

export default PrivateRoute;