import React from 'react'
import "./Component.css"

const ForumPost = ({ element}) => {
    console.log(element)
    return (
        <div className="forum-post-box">
            <h3>{element.user.username}</h3>
            <img src={element.user.image} width="75" height="75" ></img>
            <h2>{element.textarea}</h2>
            <img src={element.img} alt="no image loaded" width="200" height="200" ></img>
        </div>
    )

}








export default ForumPost;
