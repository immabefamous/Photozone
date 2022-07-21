import React from 'react'
import "./Component.css"

const ForumPost = ({ loggedInUser, element }) => {
    console.log(element)
    async function deletePost (info) {
        const del = document.getElementById(`forum-post-box${info.id}`)
        del.remove()
        let req = await fetch(`http://127.0.0.1:3000/forum_posts/${info.id}`, {
        method: "DELETE",
         })
    }
    return (
        <div id={`forum-post-box${element.id}`}>
            <h3>{element.user.username}</h3>
            <img src={element.user.image} width="75" height="75" ></img>
            <h2>{element.textarea}</h2>
            <img src={element.img} alt="no image loaded" width="200" height="200" ></img>
            {(loggedInUser.id === element.user.id) ?
                <button id="deleteButton" onClick={() => deletePost(element)}>"[X]"</button> : ""
            }
        </div>
    )

}








export default ForumPost;
