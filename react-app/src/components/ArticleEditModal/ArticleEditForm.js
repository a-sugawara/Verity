import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'
import {editArticle} from "../../store/articles"

const ArticleEditForm = ({currentArticle, setShowModal}) =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState(currentArticle.title)
    const [description, setDescription] = useState(currentArticle.description)
    const [article, setArticle] = useState(currentArticle.article)
    const [errBool, setErrBool] = useState(false)
    const [bool, setBool]= useState(false)
    const [errors, setErrors] = useState([])


    useEffect(() => {
        setBool(true)
    },[])

    const validator = () => {
        let error = []


        if(title.length > 80) {
            error.push('. : Please enter a title shorter than 80 characters.')
        } else if(title.length < 5) {
            error.push('. : Title must be at least 5 characters')
        }

        if(description.length > 150) {
            error.push('. : Source URL cannot exceed 150 characters')
        } else if(description.length < 20) {
            error.push('. : Source URL need to be at least 20 characters')
        }

        if(article.length > 500) {
            error.push('. : Facts cannot exceed 500 characters')
        } else if(article.length < 20) {
            error.push('. : Facts need to be at least 20 characters')
        }


        return error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsArr = validator()
        if(errorsArr.length) {
            setErrBool(true)
            setErrors(errorsArr)
        } else{
            setErrBool(false)
            const articleInfo = {
                user_id:sessionUser.id,
                title,
                description,
                article
            }
            const data = await dispatch(editArticle(articleInfo, id))
            if(data) {
                setErrors(data)
            }else{
                setShowModal(false)
            }
        }
    }

    return<>
        <form className={`article-edit-form-${bool}`} onSubmit={handleSubmit}>
            <div className={`errors errors-${errBool}`}>
                {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
            ))}
            </div>
            <div className="form-title">Edit Article</div>
                <input
                className='article-title-input input'
                placeholder='Title'
                required
                value = {title}
                onChange= {(e) => setTitle(e.target.value)}/>
                <input
                className='article-description-input input'
                placeholder='Source'
                required
                value={description}
                onChange= {(e) => setDescription(e.target.value)}/>
                <textarea
                className='article-input textarea-input input'
                placeholder='Factoid'
                required
                value = {article}
                onChange= {(e) => setArticle(e.target.value)}/>
                <button type='submit'
                    className="navbtn">Submit</button>
        </form>
    </>

}
export default ArticleEditForm;
