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

    async function updateLikes(likesData) {
        let newLikes =  likesData.likes + 1
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
                            <h4 id={`likes_tag${index}`}>{element.likes}</h4>
                            
                            
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