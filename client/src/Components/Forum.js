import React, { useEffect, useState } from "react"
import ForumPage from "./ForumPage"
import { Link } from "react-router-dom"

const Forum = () => {
    const [allForums, setAllForums] = useState([])
    const [isVis, setIsVis] = useState(true)
    const [selectedForum, setSelectedForum] = useState([])

    const loadForums = async () => {
        let req = await fetch("http://127.0.0.1:3000/forums")
        let res = await req.json()
        setAllForums(res)
    }
    console.log(allForums)


    // const loadChosenForum = () => {
    //     setIsVis(false)

    // }

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



        </div>
    )


}



export default Forum;