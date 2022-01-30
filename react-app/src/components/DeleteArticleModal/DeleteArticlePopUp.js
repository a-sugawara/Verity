import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import {useHistory,useParams} from 'react-router-dom'
import {deleteArticle, getAllArticles} from "../../store/articles"

const ArticleDelete = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [bool, setBool]= useState(false)

    useEffect(() => {
        setBool(true)
    },[])


    const handleSubmit = async (e) => {
        await dispatch(deleteArticle(id))
        dispatch(getAllArticles())
        history.push('/home')

    }


    return <div className={`login-form login-form-${bool} form`}>
        <div className="form-title">Delete article</div>
        <div className="delete-msg">Are you sure you want to delete this article?</div>
        <br/>
        <div
            onClick={handleSubmit}
            className="navbtn">delete</div>
    </div>
}
export default ArticleDelete;
