import React, { useState, useEffect, useRef } from "react";
import Home from "./Home";
import "./Component.css";


function Login({ setLoggedInUser }) {

    const [user, setUser] = useState("null")

    let gettingUsername;
    const [currentUser, setCurrentUser] = useState([])
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // slide show insertion
    const [index, setIndex] = useState(0);
    const delay = 2500;
    const timeoutRef = useRef(null);
    const [PicInfo, setPicInfo] = useState([])
    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
    const dummyArray = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
    async function slideShowPics() {
        let req = await fetch('https://api.unsplash.com/photos/?client_id=3MyT9v7J2-oO2smMU-C0xhMV_E-Gc2SX_2CfHx64D0E')
        let res = await req.json();
        console.log(res)
        setPicInfo(res)
    }

    useEffect(() => {
        slideShowPics();
    }, [])

    useEffect(() => {
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === PicInfo.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => { resetTimeout(); };
    }, [index]);

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

    function flipCard() {
        let front = document.getElementsByClassName("LoginPage")
        console.log(front)
        console.log(front[0].classList)
        if (front[0].classList[1] == 'flipped') {
            front[0].classList.remove('flipped')
        } else {
            front[0].classList.add('flipped')
        }
        console.log(front[0].classList)
    }

    return (
        <div className="LoginWholePage">
            <div style={{ textAlign: "center" }}>
                <h1>PhotoZone!</h1>
                <h6>all things photography</h6>
            </div>
            <div className="alignDivs">
            <div className="slideshow" >
                <div className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>

                    {/*Loop through PicInfo to have the pictures for the slide show Full-width images with number and caption text*/}
                    {PicInfo.map((element, index) => {
                        return (
                            <div className="slide" key={index} >
                                <img src={element.urls.regular} alt="tester" witdth="7590" height="500"></img>
                            </div>
                        )
                    })}
                    {/* end of loop */}
                </div>
                <div className="slideshowDots">
                    {PicInfo.map((_, idx) => (
                        <div key={idx}
                            className={`slideshowDot${index === idx ? "active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="3_image_box">

            </div>
            <div className="textbox_for_3_image_box">

            </div>
            <div className="imagebox">
            </div>
            <div className="text_for_imagebox">

            </div>


            
            <div className="LoginPage">
                <div className="login-form">
                    <div className="title">Log In</div>
                    {/* exhange <div>User is successfully logged in</div> with Jerry's component */}
                    {isSubmitted ? <Home /> : renderForm}
                    <button onClick={() => flipCard()}>SIGN UP</button>
                </div>
                <div className="signup-form">
                    <div className="title">Sign Up</div>
                    {renderForm2}
                    <button onClick={() => flipCard()}>BACK TO LOGIN</button>
                </div>
            </div>
            </div>
        </div>

    )
}

export default Login;