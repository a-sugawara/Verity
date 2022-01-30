import React, {useState} from 'react'

export default function Example() {
    const [rate,setRate] = useState(0)

    let bool
    if(rate === 24){
        bool ="false"
    }else if(rate===55){
        bool = "maybe"
    }else if(rate=== 100){
        bool = "true"
    }else if(rate=== "no selection"){
        bool = "You have not selected a degree of verity"
    }


    const falser = () =>{
        setRate(24)
    }
    const mayber = () =>{
        setRate(55)
    }
    const truther = () =>{
        setRate(100)
    }
    return (
        <div>
            <div className="splash-container-example">
                <div className="truth-animation">
                    <div className="percentage">
                        {`${rate}`}%
                    </div>

                        {/* <br/>
                        <div className="meter-card">
                            METER OF TRUTH
                        </div> */}
                        <svg className="circle-meter">
                            <circle className="circle-container" cx="120" cy="120" r="120"></circle>
                            <circle className={`circle-progress circle-progress-${rate}`} cx="120" cy="120" r="120"></circle>
                        </svg>
                        {/* <div className={`bar-test bar-test-${bool}`} >

                        </div> */}
                        {/* <div className="left-meter"></div> */}
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
                    {rate===24? <img alt="check" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                    {rate===100? <img alt="xmarks" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                    <br/>
                    {rate===24? 'If an articles ratings is below 50%, it will recieve this "X" ':null}
                    {rate===55? 'If an articles ratings is above 50%, but under 75%, it will be marked "up for debate" ':null}
                    {rate===100? 'If an articles ratings is above 75%, it will recieve this check ':null}
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
