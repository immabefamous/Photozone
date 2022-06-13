import React from "react";
import "./Component.css"

async function getPhotos () {
    
}
function expandContract() {
    const el = document.getElementById("expand-contract")
    el.classList.toggle('expanded')
    el.classList.toggle('collapsed')
 }

const dummyArray = ["a",'b','c','d','e','f','g','h','i','j','k']


function Pictures() {
    return (
        <div className ='app-container'>
            <h1>Photo Feed</h1>
            <div className='PictureFeed'>
            {dummyArray.map((element, index)=> {
                return(
                    <div className="photofeedpics" key={index}>
                        <h3>placeholder for username</h3>
                        <img id="imagebox" src="https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600296/41026708-example-white-stamp-text-on-red-backgroud.jpg" alt="" witdth= "500" height="250"></img>
                        <div className="likesDislikesComments">By placeholder for likes, dislikes, and likesDislikesComments
                        <img id="like" src="./http://clipart-library.com/images_k/thumbs-up-transparent-background/thumbs-up-transparent-background-10.png" alt="ph for numbers" width="40" height="40"></img>
                        <img id="dislike" src="./http://clipart-library.com/images_k/thumbs-up-transparent-background/thumbs-up-transparent-background-10.png" alt="" width="20" height="20"transform="scaleY(-1)"></img>
                        <h5 id="expand-contract" onclick={expandContract()}>Comments</h5>
                        </div>
                        
                        <div id="top-section">
                            This is always displayed
                        </div>
                        
                        <div id="expand-container">
                            <div id="expand-contract" class="expanded">
                            This section expands and contracts
                        
                            <table>
                                <tr><td>test1</td></tr>
                                <tr><td>test2</td></tr>
                                <tr><td>test3</td></tr>
                                <tr><td>test4</td></tr>
                            </table>
                            </div>
                        </div>
                        
                        <div id="bottom-section">
                            This section is always displayed
                        </div>
                                            </div> 
                )
            })}
            </div>
        </div>
        
    );
}

export default Pictures;