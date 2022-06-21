import { useState } from 'react';
import React from 'react';

const Comments = (element, ind) => {
    // const [isVis, setIsVis] = useState(false)
    console.log(element.element)
   
    return (
        <div>
            
            <div id={`ciContainer${element.element.id}`} key={ind} style={{overflow: "auto" }}> Comments
                {/* {element.comments.map((ele) => { */}
                <div>
                    
                        {element.element.comments.map((ele)=> {
                            return(
                                <div>
                            <h6> {ele.comment}</h6>
                    
                    <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px"></img>
                    <h4> {ele.likes}</h4>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Broken_heart.svg/1250px-Broken_heart.svg.png" height="20px" width="20px"></img>
                    <h4> {ele.dislikes}</h4>
                    </div>
                        )})}
                </div>
                                            {/* )})} */}
            </div>
        </div>
    )
}

export default Comments;