import React, {useState} from 'react';

const LoginForm = () => {

    const [uName, setUname] = useState("");
    const [uPassword, setPassword] = useState("");

    const submitHandler = (e) =>{
        e.preventDefault();
        fetch("/login",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: uName, password: uPassword})
        }).then((result) =>{
            console.log(result)
        }).catch((err) =>{
            console.log(err);
        })

    }

    const createUser = () => {
        fetch("/register", {
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
        <form onSubmit={submitHandler}>
            <input name="uName" type="text" onChange={updateName} />
            <label>User Name</label>
            <input name="uPassword" type="password" onChange={updatePassword} />
            <label>Password</label>
            <button class="w3-btn w3-teal">Login</button>
            <button class="w3-btn w3-red" onClick={createUser}>Register</button>
        </form>
    );
};

export default LoginForm;