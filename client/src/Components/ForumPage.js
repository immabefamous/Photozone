import React, { useState } from 'react'
import ForumPost from './ForumPost'
import { Link } from 'react-router-dom'

const ForumPage = (element, setIsVis, isVis) => {
    console.log(isVis)
    return (
            <div id="forum_page" style={{ display: !isVis ? "inherit" : "none" }}>
                <div id="forum-header">
                    <h1>{element.element.title}</h1>
                </div>
                {element.element.forum_posts.map((element) => {
                    console.log(element)
                    return (
                        <ForumPost element={element} />
                    )
                })}
            </div>
    )
}

export default ForumPage;