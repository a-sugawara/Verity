import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal';
import ArticleDelete from './DeleteArticlePopUp';

function ArticleDeleteModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div onClick={() => setShowModal(true)} className="cardbtn">Delete</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ArticleDelete setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}
export default ArticleDeleteModal
