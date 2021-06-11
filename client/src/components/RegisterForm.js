import React, {useState, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import {Redirect} from 'react-router-dom';

const RegisterForm = () => {

    const [uName, setUname] = useState("");
    const [uPassword, setPassword] = useState("");
    const {auth, toggleAuth} = useContext(AuthContext);

    const updateName = (e) =>{
        setUname(e.target.value);
    }

    const updatePassword = (e) =>{
        setPassword(e.target.value);
    }
     
    const createUser = (e) => {
        e.preventDefault();
        let authString = `${uName}:${uPassword}`
        fetch("/register",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify({msg: "registering user"})
        }).then((result) => {
            const token = result.json();
            document.cookie = `token=${token}`;
            toggleAuth();
        }).catch((err) => {
        })
    }

    if(auth === true){
        return <Redirect push to={{pathname: '/Home'}}></Redirect>
    }
    else {
        return (
            <form onSubmit = {createUser} className="w3-container w3-center" style={{width: "50%", margin: "auto"}}>
                <input type="text" className="w3-input" placeholder="enter username" onChange={updateName}></input>
                <label>User Name</label>
                <input name="uPassword" type="password" className="w3-input" placeholder="enter password" onChange={updatePassword}></input>
                <label>Password</label>
                <button type="submit" className="w3-btn w3-teal w3-input">Register</button>
            </form>
        )
    }
}

export default RegisterForm;