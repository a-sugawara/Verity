import React, { useState } from 'react';

import { Modal } from '../context/Modal';
import ArticleEditForm from './ArticleEditForm';

function ArticleEditModal({article}){
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div onClick={() => setShowModal(true)} className="cardbtn">Edit</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ArticleEditForm setShowModal={setShowModal} currentArticle={article}/>
                </Modal>
            )}
        </div>
    )
}
export default ArticleEditModal
