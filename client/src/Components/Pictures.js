import React, { useEffect } from "react";
import "./Component.css"
import { useState } from 'react'
import Comments from "./Comments";
import { Link } from "react-router-dom";



function Pictures() {
    const [allPhotos, getAllPhotos] = useState([])
    const [isVis, setIsVis] = useState(false)
    const [selectedComments, setSelectedComments] = useState({})

    async function getPhotos() {
        let req = await fetch("http://127.0.0.1:3000/pic_posts")
        let res = await req.json()
        getAllPhotos(res)
    }
    // function expandContract(element) {
    //     setSelectedComments(element)
    //     setIsVis(prevState => !prevState)
    // }

    async function updateLikes(likesData) {
        let newLikes = likesData.likes + 1
        let req = await fetch(`http://127.0.0.1:3000/pic_posts/${likesData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: (newLikes),
            }),
        })
        let res = await req.json()
        allPhotos[(res.id - 1)].likes = res.likes
        document.getElementById(`likes_tag${(res.id - 1)}`).innerText = allPhotos[(res.id - 1)].likes
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        let { title, image } = document.forms[0];
        let grabbedTitle = title.value
        let grabbedImage = image.value
        console.log(grabbedImage, grabbedTitle)
        fetch("http://localhost:3000/pic_posts", {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: grabbedTitle,
                image: grabbedImage, 
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
                        <div className="photofeedpics" key={index} style={{ overflow: "auto" }}>
                            <h3>{element.user.username}</h3>
                            <img id="imagebox" src={element.image} alt="" witdth="500" height="250"></img>
                            <div className="likesDislikesComments">
                                <img id="like" src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px" onClick={() => updateLikes(element)}></img>
                                <h4 id={`likes_tag${index}`}>{element.likes}</h4>


                            </div>
                            <div id="comments-containers" >
                                < Comments element={element} />

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Pictures;