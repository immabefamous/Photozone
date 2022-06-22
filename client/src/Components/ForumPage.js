import React, { useState } from 'react'
import ForumPost from './ForumPost'
import { Link } from 'react-router-dom'

const ForumPage = (element, setIsVis, isVis) => {
    console.log(isVis)
    const [isVis2, setIsVis2] = useState(false)
    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        let { title, image } = document.forms[0];
        console.log(title.value, image.value)
        let req = await fetch('http://localhost:3000/forum_posts', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                textarea: title.value,
                image: image.value,

            }
            ) },  
            )
        let res = req.json()
        if (res.ok) {
            element.element.forum_posts.push(res)
        }
        
    }
    return (
            <div id="forum_page" style={{ display: !isVis ? "inherit" : "none" }}>
                <div id="forum-header">
                    <h1>{element.element.title}</h1>
                </div>
                {element.element.forum_posts.map((element) => {
                    console.log(element)
                    return (
                        <ForumPost element={element} />
                    )
                })}
               <button onClick={()=>{setIsVis2(true)}}> Create Post</button>
            <div className="form" style={{ display: isVis2 ? "block" : "none" }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Post Title</label>
                        <input type="text" name="title" required />
                    </div>
                    <div className="input-container">
                        <label>Image </label>
                        <input type="text" name="image" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Create Forum" />
                    </div>
                </form>
            </div>

            </div>
    )
}

export default ForumPage;