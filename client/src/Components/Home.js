import React from "react";
import "./Component.css"
import {useEffect, useState, useRef} from "react"

function Home() {
const [picInfo, setPicInfo] = useState([]) 
const [index, setIndex] = useState(0);
const delay = 2500;
const timeoutRef = useRef(null);
console.log(picInfo)
function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
}
async function slideShowPics() {
   let  req = await fetch('https://api.unsplash.com/photos/?client_id=3MyT9v7J2-oO2smMU-C0xhMV_E-Gc2SX_2CfHx64D0E')
   let  res = await req.json();
   console.log(res)
    setPicInfo(res)
}

useEffect(()=> {
    slideShowPics();
},[])

useEffect(() => {
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === picInfo.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {resetTimeout();};
  }, [index]);
return (
    <div className ='app-container'>
        <h1>Welome to Photozone</h1>
        <div className="slideshow">
        <div className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>

{/*Loop through PicInfo to have the pictures for the slide show Full-width images with number and caption text*/}
    {picInfo.map((element, index)=> {
    return(
        <div className="slide" key={index}>
        <img src={element.urls.small}></img>
        <div className="text">{element.description}
        </div>
        </div> 
    )
})}
{/* end of loop */}
</div>
<div className="slideshowDots">
        {picInfo.map((_, idx) => (
          <div key={idx} 
          className={`slideshowDot${index === idx ? "active" : ""}`}
          onClick={() => {
            setIndex(idx);
          }}
          ></div>
        ))}
      </div>
</div>   
</div>
    )

}

export default Home;