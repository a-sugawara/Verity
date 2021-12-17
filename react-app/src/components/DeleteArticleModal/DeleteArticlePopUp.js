import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory,useParams} from 'react-router-dom'
import {deleteArticle, getAllArticles} from "../../store/articles"

const ArticleDelete = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()



    const handleSubmit = async (e) => {
        await dispatch(deleteArticle(id))
        dispatch(getAllArticles())
        history.push('/')

    }


    return <div>
        delete<br/>
        <div
            onClick={handleSubmit}
            className="navbtn">delete</div>
    </div>
}
export default ArticleDelete;
