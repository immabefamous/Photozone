
import React from 'react';
import { useState } from 'react';

const Comments = ({ element, ind, loggedInUser }) => {
    const [isVis2, setIsVis2] = useState(false)
    const [isVisL, setIsVisL] = useState(false)

    function showComments(commentBox) {
        document.getElementById(`ciContainer${commentBox.id}`).style.height = "200px"

    }

    async function updateLikes(likesData, index) {
        console.log(index)
        let newLikes;
        setIsVisL(!isVisL)
        if (isVisL == true) {
        newLikes = likesData.likes + 1
        } else {
        newLikes = likesData.likes - 1
        }
        let req = await fetch(`http://127.0.0.1:3000/comments/${likesData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: (newLikes),
            }),
        })
        let res = await req.json()
        console.log(element.comments, likesData)

        element.comments[index].likes = newLikes
        document.getElementById(`likes_tag${index}`).innerText = element.comments[index].likes
    }


    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        let { comment } = document.forms[(ind + 1)];
        let req = await fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comment: comment.value,
                user_id: loggedInUser.id,
                pic_post_id: element.id

            })},)
        let res = await req.json()
        element.comments.push(res)
        document.getElementById('commentButton').style.display = "block"
        setIsVis2(false)
    }
    return (
        <div>
            <h4 onClick={() => showComments(element)}> Comments </h4>

            <div id={`ciContainer${element.id}`} key={ind} style={{ overflow: "auto", height: "0px" }}>
                <div>
                    {element.comments.map((ele, index, ) => {
                        return (
                            <div id="listOfComments" key={ele.id} style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                                <h6> {ele.user.username}</h6>
                                <h5> {ele.comment}</h5>
                                <img src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px" onClick={() => updateLikes(ele, ind)}></img>
                                <h4 id={`likes_tag${index}`}> {ele.likes}</h4>
                            </div>
                        )
                    })}
                </div>
                <button id="commentButton" onClick={() => { setIsVis2(true); document.getElementById('commentButton').style.display = "none" }}> Create A Comment</button>
                <div className="form" style={{ display: isVis2 ? "block" : "none" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Thoughts</label>
                            <input type="text" name="comment" required />
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Create Post" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Comments;