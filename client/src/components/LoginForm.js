import React, {useState, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';

const LoginForm = () => {

    const [uName, setUname] = useState("");
    const [uPassword, setPassword] = useState("");
    const {auth, toggleAuth} = useContext(AuthContext);

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
            console.log(auth);

        }).catch((err) => {
            console.log(err);
        });
    }

    const createUser = (e) => {
        e.preventDefault();
        fetch("/register",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: uName, password: uPassword})
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err);
        })
    }

    const updateName = (e) =>{
        setUname(e.target.value);
    }

    const updatePassword = (e) =>{
        setPassword(e.target.value);
    }

    return (
        <form onSubmit={submitHandler} className="w3-container w3-center" style={{width: "50%", margin:"auto"}}>
            <input name="uName" type="text" className="w3-input" onChange={updateName} />
            <label>User Name</label>
            <input name="uPassword" type="password" className="w3-input" onChange={updatePassword} />
            <label>Password</label>
            <button className="w3-btn w3-teal w3-input">Login</button>
            <button className="w3-btn w3-red w3-input" onClick={createUser}>Register</button>
        </form>
    );
};

export default LoginForm;