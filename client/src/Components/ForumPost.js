import React from 'react'
import "./Component.css"

const ForumPost = (loggedInUser, element) => {
    console.log(element)
    return (
        <div className="forum-post-box">
            <h3>{element.element.user.username}</h3>
            <img src={element.element.user.image} width="75" height="75" ></img>
            <h2>{element.element.textarea}</h2>
            <img src={element.element.img} alt="no image loaded" width="200" height="200" ></img>
        </div>
    )

}








export default ForumPost;
