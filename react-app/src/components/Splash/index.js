import React, { useState} from 'react'


export default function Splash() {
    const [bool, setBool] = useState(false)
    return (
        <div
            onMouseEnter={() => setBool(true)}
            onMouseLeave={() => setBool(false)}
            className="splash-container welcome-text">
            <div>
                Welcome
                <br/>
                <br/>
                At <span className={`verity-word verity-word-${bool} `} > Verity</span>, our mission is a simple one.
                <br/>

                <br/>
                <span className={`bold med-word med-word-${bool}`}>Find</span> the  <span className={`large-word large-word-${bool}`}>truth</span>.
                <br/>

                <br/>
                    <div className={`keep-scrolling keep-scrolling-${bool}`}>Keep Scrolling to find out how you can participate in <br/> our exploration. Here are some examples of "facts"</div>

                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}
