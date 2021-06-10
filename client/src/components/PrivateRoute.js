import React, { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {

    const {auth} = useContext(AuthContext);
    return (
        <Route {...rest} render={() => (
            auth === true ? <Component />
            : <Redirect to="/Login" />
        )} />
    );
};

export default PrivateRoute;