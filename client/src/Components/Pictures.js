import React, { useEffect } from "react";
import "./Component.css"
import {useState} from 'react'
import Comments from "./Comments";



function Pictures() {
    const [allPhotos, getAllPhotos] = useState([])
    // const [isVis, setIsVis] = useState(false)
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

    async function updateLikes(likeDisLikeData) {
        console.log(likeDisLikeData.likes)
        let req = await fetch(`http://127.0.0.1:3000/pic_posts/${likeDisLikeData.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  likes: (likeDisLikeData.likes + 1),
                }),
              })
        let res = await req.json()
        console.log(res)
    }
    
    // allPhotos.map((element, index) => {
    //     let v = `isVis${index}`
    //     let setV =`setVis${index}`
        
        // return(
        //     (const [v,setV] = useState([]))
        // )
        // })
    useEffect(() => {getPhotos()}, [])

    return (
        <div className='app-container'>
            <h1>Photo Feed</h1>
            <div className='PictureFeed'>
                {allPhotos.map((element, index) => {
                    
                    return (
                        <div className="photofeedpics" key={index} style = {{overflow:"auto"}}>
                            <h3>{element.user.username}</h3>
                            <img id="imagebox" src={element.image} alt="" witdth="500" height="250"></img>
                            <div className="likesDislikesComments">
                            <img id="like" src= "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px" onClick={() => updateLikes(element)}></img>
                            <h4 id="likes_tag">{element.likes}</h4>
                            <img id="dislike" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Broken_heart.svg/1250px-Broken_heart.svg.png" height="17px" width="17px"></img>
                            <h4 id="dislike_tag">{element.dislike}</h4>
                            
                            </div>
                            <div id="comments-containers" >
                                    < Comments element= {element} />
                                    
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default Pictures;