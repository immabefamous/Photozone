import React, { useEffect } from "react";
import "./Component.css"
import { useState } from 'react'
import Comments from "./Comments";
import { Link } from "react-router-dom";



function Pictures({ loggedInUser }) {
    const [allPhotos, getAllPhotos] = useState([])
    const [isVis, setIsVis] = useState(false)
    const [isVisL, setIsVisL] = useState(true)
    const [selectedComments, setSelectedComments] = useState({})

    async function getPhotos() {
        let req = await fetch("https://tranquil-plateau-22078.herokuapp.com/pic_posts")
        // let req = await fetch("https://http://127.0.0.1:3000/pic_posts")
        let res = await req.json()
        getAllPhotos(res)
    }
    // function expandContract(element) {
    //     setSelectedComments(element)
    //     setIsVis(prevState => !prevState)
    // }

    async function updateLikes(likesData) {
        let newLikes;
        setIsVisL(!isVisL)
        if (isVisL == true) {
        newLikes = likesData.likes + 1
        } else if (isVisL == false) {
        newLikes = likesData.likes - 1 
        }
        
        let req = await fetch(`https://tranquil-plateau-22078.herokuapp.com/pic_posts/${likesData.id}`, {
        // let req = await fetch(`https://http://127.0.0.1:3000/pic_posts/${likesData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: (newLikes),
            }),
        })
        let res = await req.json()
        
        
        likesData.likes = res.likes
        document.getElementById(`likes_tag${(likesData.id)}`).innerText = likesData.likes
    }
        async function deletePost (info) {
            const del = document.getElementById(`photofeedpics${info.id}`)
            del.remove()
            let req = await fetch(`https://tranquil-plateau-22078.herokuapp.com/pic_posts/${info.id}`, {
            // let req = await fetch(`https://http://127.0.0.1:3000/pic_posts/${info.id}`, {
            method: "DELETE",
             })
        }
    
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        let { title, image } = document.forms[0];
        let grabbedTitle = title.value
        let grabbedImage = image.value
        
        fetch("https://tranquil-plateau-22078.herokuapp.com/pic_posts", {
        // fetch("https://http://127.0.0.1:3000/pic_posts", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: grabbedTitle,
                image: grabbedImage,
                user_id: loggedInUser.id
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => getAllPhotos((prevState) => [...prevState, user]))
                } else {
                    r.json().then((err) => console.log(err))
                }
            });
    }
    // allPhotos.map((element, index) => {
    //     let v = `isVis${index}`
    //     let setV =`setVis${index}`

    // return(
    //     (const [v,setV] = useState([]))
    // )
    // })
    useEffect(() => { getPhotos() }, [])

    return (
        <div className='app-container'>
            <Link to="/">
                <button className='back-btn'>Back to Home Page</button>
            </Link>
            <h1>Photo Feed</h1>
            <button onClick={() => setIsVis(true)}> New Post</button>
            <div className="form" style={{ display: isVis ? "block" : "none" }}>
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
                        <input type="submit" value="Create Post" />
                    </div>
                </form>
            </div>
            <div className='PictureFeed'>
                {allPhotos.map((element, index) => {
                    return (
                        <div id={`photofeedpics ${element.id}`} key={index} style={{ border: "5px solid black",}}>
                           <div id="upperPortion">
                            <div style={{display: "flex"}}>
                            <img id="userImg" src={element.user.img} alt="" width="50" height="50" ></img>
                            <h3 id="userName">{element.user.username}</h3>
                            </div>
                            <img id="imagebox" src={element.image} alt="" max-width="200%" height="auto"></img>
                            <h4>{element.title}</h4>
                            </div>
                            <div className="likesDislikesComments">
                                <img id="like" src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px" onClick={() => updateLikes(element)}></img>
                                <h4 id={`likes_tag${element.id}`}>{element.likes}</h4>
                                {(loggedInUser.id == element.user.id) ? 
                                    <img id="deleteButton" src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" width="50" height="50" onClick={() => deletePost(element)}></img> : ""
                                }
                            </div>
                            <div id="comments-containers" style={{ overflow: "auto", border: "5px solid lightblue" }}>
                                <Comments element={element} ind={index} loggedInUser={loggedInUser} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Pictures;