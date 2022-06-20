import React from 'react'


const ForumPost = (element) => {

    return (
        <div>
            <h3>element.user.username</h3>
            <img src={element.user.image} width="75" height="75" ></img>
            <h2>{element.textarea}</h2>
            <img src={element.img} alt="no image loaded" width="200" height="200" ></img>
        </div>
    )

}








export default ForumPost;
