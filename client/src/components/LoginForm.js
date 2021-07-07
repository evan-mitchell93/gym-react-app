import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginForm = () => {

    const [uName, setUname] = useState("");
    const [uPassword, setPassword] = useState("");
    const {auth, toggleAuth} = useContext(AuthContext);

    useEffect (() => {
        if(Cookies.get('jwt')){
            toggleAuth();
        }
    });

    const submitHandler = (e) =>{
        e.preventDefault();
        let authString = `${uName}:${uPassword}`
        fetch("/login/", {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString} `,
            },
            body: JSON.stringify({msg: "login"})
        }).then((result) => {
            const token = result.json();
            document.cookie = `token=${token}`;
            toggleAuth();

        }).catch((err) => {
            console.log(err);
        });
    }



    const updateName = (e) =>{
        setUname(e.target.value);
    }

    const updatePassword = (e) =>{
        setPassword(e.target.value);
    }


    if(auth === true){
        return <Redirect push to={{pathname: '/Home'}}></Redirect>
    }
    else{

    return (
        <div>
            <form onSubmit={submitHandler} className="w3-container w3-center" style={{width: "50%", margin:"auto"}}>
                <input name="uName" type="text" className="w3-input" onChange={updateName} placeholder="enter username" />
                <label>User Name</label>
                <input name="uPassword" type="password" className="w3-input" onChange={updatePassword} placeholder="enter password" />
                <label>Password</label>
                <button type="submit" className="w3-btn w3-teal w3-input">Login</button>
                
            </form>
                {/*<a href="/Register">Register</a> */}
            </div>
        );
    }
};

export default LoginForm;