import React, { useEffect, useState } from "react"
import ForumPage from "./ForumPage"
import { Link } from "react-router-dom"

const Forum = ({ loggedInUser }) => {
    const [allForums, setAllForums] = useState([])
    const [isVis, setIsVis] = useState(true)
    const [isVis2, setIsVis2] = useState(false)
    const [isVisL, setIsVisL] = useState(true)
    const [selectedForum, setSelectedForum] = useState([])

    const loadForums = async () => {
        let req = await fetch("http://127.0.0.1:3000/forums")
        let res = await req.json()
        setAllForums(res)
    }

    async function updateLikes(likesData) {
        let newLikes;
        setIsVisL(!isVisL)
        if (isVisL == true) {
        newLikes = likesData.likes + 1
        } else {
        newLikes = likesData.likes - 1
        }
        let req = await fetch(`http://127.0.0.1:3000/forums/${likesData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: (newLikes),
            }),
        })
        let res = await req.json()
        allForums[(res.id - 1)].likes = res.likes
        document.getElementById(`likes_tag${(res.id - 1)}`).innerText = allForums[(res.id - 1)].likes
    }

    async function deletePost (info) {
        const del = document.getElementById(`forum-container${info.id}`)
        del.remove()
        let req = await fetch(`https://tranquil-plateau-22078.herokuapp.com/forums/${info.id}`, {
        method: "DELETE",
         })
    }

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        let { title, image } = document.forms[0];
        
        let req = await fetch('https://tranquil-plateau-22078.herokuapp.com/forums', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title.value,
                image: image.value,
                user_id: loggedInUser.id
            }
            )
        },
        )
        let res = await req.json()
        setAllForums((prevState) => [...prevState, res])
        setIsVis2(false)
    }



    useEffect(() => { loadForums() }, [])

    return (
        <div>
            <Link to="/">
                <button className='back-btn'>Back to Home Page</button>
            </Link>
            <div id="welcome_box"  >
                <h1>Welcome to Photozone Forums</h1>
                {/* load forums  */}

                {allForums.map((element, index) => {
                    
                    return (
                        <div id={`forum-container${element.id}`} key={index} >
                            <div className="forumlinkbox" style={{ display: isVis ? "inherit" : "none" }}>
                                <h1 className="addHov" onClick={() => { setIsVis(false); setSelectedForum(element) }} >{element.title}</h1>
                                <img src="{element.image}"></img>
                                <img id="like" src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px" onClick={() => updateLikes(element)}></img>
                                <h4 id={`likes_tag${index}`}>{element.likes}</h4>
                                <h2> Creator: {element.user.name}</h2>
                                <img src={element.user.image} alt="user image" height={"75"} width={"75"}></img>
                            </div>
                            {(loggedInUser.id == element.user.id) ? 
                                    <button id="deleteButton" onClick={() => deletePost(element)}>"[X]"</button> : ""
                                }
                        </div>
                    )

                })}
                <button id="back-to-forums" onClick={() => setIsVis(true)} style={{ display: !isVis ? "inherit" : "none" }}>Back To All Forums </button>
                {!isVis ? <ForumPage loggedInUser={loggedInUser} element={selectedForum} setIsVis={setIsVis} isVis={isVis} /> : null}
            </div>
            <button onClick={() => { setIsVis2(true) }} style={{ display: !isVis2 ? "block" : "none" }}> Create Forum</button>
            <div className="form" style={{ display: isVis2 ? "block" : "none" }}>
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
                        <input type="submit" value="Create Forum" />
                    </div>
                </form>
            </div>

        </div>
    )

}




export default Forum;