import React, { useState } from 'react'
import ForumPost from './ForumPost'
import { Link } from 'react-router-dom'

const ForumPage = ({loggedInUser, element, setIsVis, isVis}) => {
    console.log(element, loggedInUser)
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
                user_id: loggedInUser.id,
                forum_id: element.id

            }
            ) },  
            )
        let res = await req.json()
        element.forum_posts.push(res)
        // let s = document.getElementById("forum-header")
        // let nDiv = document.createElement('div')
        // nDiv.className = "forum-post-box"
        // let h3 = document.createElement('h3')
        // let img = document.createElement('img')
        // let h2 = document.createElement('h2')
        // let img2 = document.createElement("img")
        // h3.innerText = res.user.username
        // img.src = res.user.image
        // h2.innerText = res.textarea
        // img2.src = res.image
        // nDiv.append(h3, img, h2, img2)
        // s.append(nDiv)
        setIsVis2(false)

        }
        
    
    return (
            <div id="forum_page" style={{ display: !isVis ? "inherit" : "none" }}>
                <div id="forum-header">
                    <h1>{element.title}</h1>
                </div>
                {element.forum_posts.map((element) => {
                    console.log(element)
                    return (
                        <ForumPost element={element} loggedInUser={loggedInUser}/>

                    )
                })}
               <button onClick={()=>{setIsVis2(true)}} style={{ display: !isVis2 ? "block" : "none" }}> Create Post</button>
            <div className="form" style={{ display: isVis2 ? "block" : "none" }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Thoughts</label>
                        <input type="textarea" name="title" required />
                    </div>
                    <div className="input-container">
                        <label>Image </label>
                        <input type="text" name="image" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Create Post" />
                    </div>
                </form>
            </div>

            </div>
    )
}

export default ForumPage;