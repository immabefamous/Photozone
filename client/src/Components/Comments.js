
import React from 'react';

const Comments = (element, ind) => {
    
    function showComments (commentBox) {
        document.getElementById(`ciContainer${commentBox.id}`).style.height = "200px"
        
    }
    
   
    return (
        <div onClick={() => showComments(element.element)}> Comments
            
            <div id={`ciContainer${element.element.id}`} key={ind}  style={{overflow: "auto", height: "0px"}}>
                {/* {element.comments.map((ele) => { */}
                <div>
                    
                        {element.element.comments.map((ele)=> {
                            return(
                                <div key={ele.id}>
                            <h6> {ele.comment}</h6>
                    
                    <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px"></img>
                    <h4> {ele.likes}</h4> 
                    </div>
                        )})}
                </div>
                                            {/* )})} */}
            </div>
        </div>
    )
}

export default Comments;