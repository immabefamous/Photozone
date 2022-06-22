import React, { useState, useEffect } from "react";
import Home from "./Home";
import "./Component.css";

function Login({setLoggedInUser}) {

    const [user, setUser] = useState("null")

    let gettingUsername;
    const [currentUser, setCurrentUser] = useState([])
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);




    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    async function getUser() {
        const req = await fetch(`http://localhost:3000/users`);
        const res = await req.json();
        setCurrentUser(res);
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        let { uname, pass } = document.forms[0];
        gettingUsername = uname.value
        // User Login info



        // Find user login info
        const userData = currentUser.find((user) => user.username === uname.value);
        console.log(userData)
        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setLoggedInUser(userData)
                console.log(userData.subscription)
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
        console.log(userData.username)
        let username = userData.username
        let password = userData.password
        fetch("http://localhost:3000/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                } else {
                    r.json().then((err) => console.log(err))
                }
            });
        console.log(userData)
        fetch(`http://localhost:3000/sessions/${userData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subscription: (true),
            }),
        })
        

    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );



    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" value="Login" />
                    <a href="http://localhost:4000/signup"> Sign Up </a>
                </div>
            </form>
        </div>
    );

    useEffect(() => { getUser() }, [])


    return (
        <div className="login-form">
            <div className="title"></div>
            {/* exhange <div>User is successfully logged in</div> with Jerry's component */}
            {isSubmitted ? <Home /> : renderForm}
            { }
        </div>
    )
}

export default Login;