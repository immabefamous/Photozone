import React, { useEffect, useState } from "react"
import ForumPage from "./ForumPage"
import { Link } from "react-router-dom"

const Forum = () => {
    const [allForums, setAllForums] = useState([])
    const [isVis, setIsVis] = useState(true)
    const [isVis2, setIsVis2] = useState(false)
    const [selectedForum, setSelectedForum] = useState([])

    const loadForums = async () => {
        let req = await fetch("http://127.0.0.1:3000/forums")
        let res = await req.json()
        setAllForums(res)
    }


    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        let { title, image } = document.forms[0];
        console.log(title.value, image.value)
        let req = await fetch('http://localhost:3000/forums', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title.value,
                image: image.value,

            }
            ) },  
            )
        let res = req.json()
        if (res.ok) {
            setAllForums((prevState) => [...prevState, res])
        }
        
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
                        console.log(element)
                    return (
                        <div className={`forum-container${index}`} key={index} >
                            <div className="forumlinkbox" onClick={() => {setIsVis(false); setSelectedForum(element)}} style={{ display: isVis ? "inherit" : "none" }}>
                                <h2>{element.title}</h2>
                                <img src="{element.image}"></img>
                                <img id="like" src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg" height="22px" width="22px"></img>
                                <h4>{element.likes}</h4>
                                <h2> Creator: {element.user.name}</h2>
                                <img src={element.user.image} alt="user image"></img>
                            </div>

                        </div>
                    )
                    
                })}
                <button id="back-to-forums" onClick={() =>setIsVis(true)} style={{ display: !isVis ? "inherit" : "none" }}>Back To All Forums </button>
                {!isVis ? <ForumPage element={selectedForum} setIsVis={setIsVis} isVis= {isVis}/> : null}
            </div>
            <button onClick={()=>{setIsVis2(true)}}> Create Forum</button>
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