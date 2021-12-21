import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal';
import ArticleEditForm from './ArticleEditForm';

function ArticleEditModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div onClick={() => setShowModal(true)} className="cardbtn">Edit</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ArticleEditForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}
export default ArticleEditModal
