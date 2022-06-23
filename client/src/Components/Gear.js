import React from "react";

function Gear() {
    // let dummyArray = [0,1,2,3,4,5,6,7,8,9,10]
    return (
        <div className ='app-container'>
            <h1>Gear Marketplace</h1>
            <div className="marketplace">
                <div>
                    {/* <h1>side menu</h1> */}
                    <img src="https://s3.amazonaws.com/premium.fundsforngos.org/maintenance-min.png"></img>
                </div>
                {/* <div className="grid-for-items">
                    {dummyArray.map((element, index) => {
                        return (
                            <div> {element} {index} 
                            </div>
                        )
                    })}
                </div> */}

            </div>
        </div>
        
    );
}

export default Gear;