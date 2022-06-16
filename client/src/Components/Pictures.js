import React, { useEffect } from "react";
import "./Component.css"
import {useState} from 'react'



function Pictures() {
    const [allPhotos, getAllPhotos] = useState([])
    const [isVis, setIsVis] = useState(false)
    async function getPhotos() {
        let req = await fetch("http://127.0.0.1:3000/pic_posts")
        let res = await req.json()
        getAllPhotos(res)
    }
    function expandContract() {
        
        setIsVis(prevState => !prevState)
    }
    
    const dummyArray = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

    useEffect(() => {getPhotos()}, [])

    return (
        <div className='app-container'>
            <h1>Photo Feed</h1>
            <div className='PictureFeed'>
                {allPhotos.map((element, index) => {
                    return (
                        <div className="photofeedpics" key={index}>
                            <h3>{element.user.username}</h3>
                            <img id="imagebox" src={element.image} alt="" witdth="500" height="250"></img>
                            <div className="likesDislikesComments">
                            <img id="like" src= "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px"></img>
                            <h4>{element.likes}</h4>
                            <img id="dislike" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Broken_heart.svg/1250px-Broken_heart.svg.png" height="17px" width="17px"></img>
                            <h4>{element.dislike}</h4>
                            <h5 id="expand-contract" onClick={expandContract}>Comments</h5>
                            </div>
                            <div id="comments-containers" >

                                <div id="expand-container" style={{height: isVis ? "100px" : "0px", overflow:"auto"}}>
                                {allPhotos.comments.map((element, )=> {
                                return(
                                    <div className="ciContainer" >
                                            <div>
                                            <h6> {element.comment}</h6>
                                            </div>
                                            <img src= "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px"></img>
                                            <h4> {element.likes}</h4>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Broken_heart.svg/1250px-Broken_heart.svg.png" height="20px" width="20px"></img>
                                            <h4> {element.dislikes}</h4>
                                    </div>
                                    )
                                })}
                                </div>


                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default Pictures;