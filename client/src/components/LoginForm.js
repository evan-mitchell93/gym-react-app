import React, {useState} from 'react';

const LoginForm = () => {

    const [uName, setUname] = useState("");
    const [uPassword, setPassword] = useState("");

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
            console.log(result)
        }).catch((err) => {
            console.log(err);
        })
    }

    const createUser = () => {
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
        <form onSubmit={submitHandler} class="w3-container w3-center" style={{width: "50%", margin:"auto"}}>
            <input name="uName" type="text" class="w3-input" onChange={updateName} />
            <label>User Name</label>
            <input name="uPassword" type="password" class="w3-input" onChange={updatePassword} />
            <label>Password</label>
            <button class="w3-btn w3-teal w3-input">Login</button>
            <button class="w3-btn w3-red w3-input" onClick={createUser}>Register</button>
        </form>
    );
};

export default LoginForm;