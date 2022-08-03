import React from "react";
import "./Component.css";
import {useState} from "react";
import { Link } from "react-router-dom";

function Profile ({loggedInUser}) {
    const [changed, setChanged] = useState(true)
    const [isVis, setIsVis] = useState(false)
    const [isVis2, setIsVis2] = useState(false)
    const [isVis3, setIsVis3] = useState(false)
    const [isVis4, setIsVis4] = useState(false)
    
    function userPics () {
        setIsVis(true)
        setIsVis2(false)
        setIsVis3(false)
        setIsVis4(false)
    }
    function userCom () {
        setIsVis(false)
        setIsVis2(true)
        setIsVis3(false)
        setIsVis4(false)
    }
    function userFor () {
        setIsVis(false)
        setIsVis2(false)
        setIsVis3(true)
        setIsVis4(false)
    }
    function userForP () {
        setIsVis(false)
        setIsVis2(false)
        setIsVis3(false)
        setIsVis4(true)
    }

    return (
        <div className ='app-container'>
            <Link to="/">
                <button className='back-btn'>Back to Home Page</button>
            </Link>
            <div id="userInfo">
                <h1>{loggedInUser.username}'s Profile</h1>
                <img src={loggedInUser.image} alt="user picture"></img>
            </div>
            <div className="fullProfile">
                <div id="directoryButtons">
                    <h3 onClick={() => userPics()}> Pictures</h3>
                    <h3 onClick={() => userCom()}> Comments</h3>
                    <h3 onClick={() => userFor()}> forums</h3>
                    <h3 onClick={() => userForP()}> forum posts</h3>
                </div>
                <div id="picturesContent" style={{display: isVis ? "inherit" : "none"}}> 
                    {loggedInUser.pic_posts.map((element) => {
                        return (
                        <div>
                        <h5>{element.title}</h5>
                        <img src={element.image}></img>
                        <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg"></img>
                        <h6>{element.likes}</h6>
                        </div>
                        )
                    })}
                </div>
                <div id="commentsContent" style={{display: isVis2 ? "inherit" : "none"}}> 
                {loggedInUser.comments.map((element) => {
                        return (
                        <div>
                        <h5>{element.comments}</h5>
                        {/* <img src={element.image}></img> */}
                        <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg"></img>
                        <h6>{element.likes}</h6>
                        </div>
                        )
                    })}
                </div>
                <div id="forumContent" style={{display: isVis3 ? "inherit" : "none"}}> 
                {loggedInUser.forums.map((element) => {
                        return (
                        <div>
                        <h5>{element.title}</h5>
                        {/* <img src={element.image}></img> */}
                        <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg"></img>
                        <h6>{element.likes}</h6>
                        </div>
                        )
                    })}
                </div>
                <div id="ForumPostsContent" style={{display: isVis4 ? "inherit" : "none"}}> 
                {loggedInUser.forum_posts.map((element) => {
                        return (
                        <div>
                        {/* <img src={element.image}></img> */}
                        <img src={element.image}></img>
                        <h5>{element.textarea}</h5>
                        <h6>{element.likes}</h6>
                        </div>
                        )
                    })}
                </div>
                    
                

            </div>
        </div>
        
    );
}


export default Profile;