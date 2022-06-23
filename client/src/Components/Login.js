import React, { useState, useEffect } from "react";
import Home from "./Home";
import "./Component.css";


function Login({ setLoggedInUser }) {

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
                </div>
            </form>
        </div>
    );

    useEffect(() => { getUser() }, [])

    const [isSubmitted2, setIsSubmitted2] = useState(true);

    const errors2 = {
        uname: "invalid username",
        pass: "invalid password",

        fname: "give a proper full name"
    };

    async function handleSubmit2(event) {
        //Prevent page reload
        event.preventDefault();

        let { uname, pass, img, fname } = document.forms[1];

        console.log(pass.value)
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: fname.value,
                image: img.value,
                username: uname.value,
                password: pass.value,
            }
            )
        },
        )
        setIsSubmitted2(true)
        alert("you can now log in")
    }

    // JSX code for login form
    const renderForm2 = (
        <div className="form2">

            <form onSubmit={handleSubmit2}>
                {/* First and Last Name */}
                <div className="input-container">
                    <label>Full Name </label>
                    <input type="text" name="fname" required />

                </div>
                {/* Image */}
                <div className="input-container">
                    <label>Image</label>
                    <input type="text" name="img" required />

                </div>

                {/* User Name */}
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />

                </div>
                {/* Password */}
                <div className="input-container">
                    <label>Password </label>
                    <input type="text" name="pass" required />

                </div>

                <div className="button-container">
                    <input type="submit" value="Signup" />

                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Log In</div>
                {/* exhange <div>User is successfully logged in</div> with Jerry's component */}
                {isSubmitted ? <Home /> : renderForm}
            </div>
                <div className="signup-form">
                    <div className="title" onClick={()=> {setIsSubmitted2(!isSubmitted2)}}>Sign Up</div>
                    {isSubmitted2 ? "" : renderForm2}
                </div>
        </div>
        
    )
}

export default Login;