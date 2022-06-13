import React from "react";
import "./Component.css"
import {useEffect, useState, useRef} from "react"

function Home() {
const [picInfo, setPicInfo] = useState([]) 
const [index, setIndex] = useState(0);
const delay = 2500;
const timeoutRef = useRef(null);
function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
}
const dummyArray = ["a",'b','c','d','e','f','g','h','i','j','k']
// async function slideShowPics() {
//    let  req = await fetch('https://api.unsplash.com/photos/?client_id=3MyT9v7J2-oO2smMU-C0xhMV_E-Gc2SX_2CfHx64D0E')
//    let  res = await req.json();
//    console.log(res)
//     setPicInfo(res)
// }

// useEffect(()=> {
//     slideShowPics();
// },[])

useEffect(() => {
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === dummyArray.length - 1 ? 0 : prevIndex + 1
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
    {dummyArray.map((element, index)=> {
    return(
        <div className="slide" key={index}>
        <img src="https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600296/41026708-example-white-stamp-text-on-red-backgroud.jpg" alt="tester" witdth= "500" height="250"></img>
        <div className="text">"Dessert in Dubai"
        </div>
        </div> 
    )
})}
{/* end of loop */}
</div>
<div className="slideshowDots">
        {dummyArray.map((_, idx) => (
          <div key={idx} 
          className={`slideshowDot${index === idx ? "active" : ""}`}
          onClick={() => {
            setIndex(idx);
          }}
          ></div>
        ))}
      </div>
</div>

<div className="3_image_box">

</div>
<div className="textbox_for_3_image_box">

</div>
<div className="imagebox">
</div>
<div className="text_for_imagebox">

</div>
</div>

    )

}

export default Home;