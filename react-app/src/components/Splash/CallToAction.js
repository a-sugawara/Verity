import React from 'react'
import LoginModal from '../auth/LoginModal'
import SignUpModal from '../auth/SignUpModal'

export default function CallToAction() {
    return (
        <div>
            <div className="splash-container">
                <div>
                    Sign up if you haven't already.
                    <br/>
                    <br/>
                    And if you have, go ahead and log in!
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="navbtn-holder-large">
                        <LoginModal />
                        <SignUpModal />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    Your truth
                    <br/>
                    is our Verity.
                </div>
            </div>
        </div>
    )
}
