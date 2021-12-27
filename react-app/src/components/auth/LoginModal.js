import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal'
import LoginForm from './LoginForm';
import {login} from '../../store/session';

function LoginModal(){

    const [showModal, setShowModal] = useState(false)


    return (
        <div className="navbtn-holder">
            <div className="jbtn" onClick={() => setShowModal(true)}>Login</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
}

export default LoginModal
