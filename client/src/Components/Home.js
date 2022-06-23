import React from "react";
import "./Component.css"
import { useEffect, useState, useRef } from "react"

function Home({loggedInUser}) {
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
     let  req = await fetch('https://api.unsplash.com/photos/?client_id=3MyT9v7J2-oO2smMU-C0xhMV_E-Gc2SX_2CfHx64D0E')
     let  res = await req.json();
     console.log(res)
      setPicInfo(res)
  }

  useEffect(()=> {
      slideShowPics();
  },[])

  useEffect(() => {
    // auto-login
    fetch(`http://127.0.0.1:3000/users/${loggedInUser.id}`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setIsSubmitted(true)
      }
    });
  }, []);


  const [user, setUser] = useState("user");

  async function Login(user) {
    let req = await fetch(`http://127.0.0.1:3000/sessions/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subscription: "true",
            }),
        });
      }
  // if (!user) return alert("sign in")

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
        setIsSubmitted(true);
        Login(userData)
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
      body: JSON.stringify({username, password}),
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => console.log(err))
      }
    });
   
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
          <input type="submit" value="Login"/>
          <a href="http://localhost:4000/signup"> Sign Up </a>
        </div>
      </form>
    </div>
  );

  useEffect(()=> {getUser()}, [])

  return (
    <div className='app-container'>
      <h1>Welome to Photozone</h1>
      <div className="login-form">
        <div className="title"></div>
        {/* exhange <div>User is successfully logged in</div> with Jerry's component */}
        {isSubmitted ? <h1>{user.name}</h1> : renderForm}
        {}
      </div>
      <div className="slideshow">
        <div className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>

          {/*Loop through PicInfo to have the pictures for the slide show Full-width images with number and caption text*/}
          {PicInfo.map((element, index) => {
            return (
              <div className="slide" key={index} >
                <img src={element.urls.regular} alt="tester" witdth="500" height="250"></img>
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
    </div>

  )

}

export default Home;