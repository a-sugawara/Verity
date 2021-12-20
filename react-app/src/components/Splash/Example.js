import React, {useState} from 'react'

export default function Example() {
    const [rate,setRate] = useState("")

    let bool
    if(rate === 1){
        bool ="false"
    }else if(rate===50){
        bool = "maybe"
    }else if(rate=== 100){
        bool = "true"
    }else if(rate=== "no selection"){
        bool = "You have not selected a degree of verity"
    }


    const falser = () =>{
        setRate(1)
    }
    const mayber = () =>{
        setRate(50)
    }
    const truther = () =>{
        setRate(100)
    }
    return (
        <div>
            <div className="splash-container-example">
                <div className="truth-animation">

                        <br/>
                        <div className="meter-card">
                            METER OF TRUTH
                        </div>
                        <div className={`bar-test bar-test-${bool}`} >

                        </div>
                        <div className="left-meter"></div>
                        {/* <div className="right-meter"></div> */}

                </div>
                <div className='rater-holder'>
                    When you checkout some facts, you will see this bar
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    If you hover over the bar your choices will appeaer.
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    There is "false", "maybe", or "true"
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="btnbox-white">
            <div
                className="btn btn-red">
                    <div className="fals"
                        onClick={falser}
                        >
                        False
                    </div>

                </div>
            <div
                className="btn btn-yellow">
                    <div className="mayb"
                        onClick={mayber}
                        >
                        Maybe
                    </div>
                </div>
            <div
                className="btn btn-green">
                    <div className="truth"
                        onClick={truther}
                        >
                        True
                    </div>
                </div>
            </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {rate===1? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                    
                    {rate===100? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                    <br/>
                    {rate===1? 'If an article is verified to be "false", it will recieve this "X" ':null}

                    {rate===100? 'If an article is verified to be "true", it will recieve this check ':null}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className={`isTrue-${bool}`}>{bool?.toUpperCase()}</div>
        </div>

    )
}
