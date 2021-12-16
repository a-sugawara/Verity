import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import {postArticle} from "../../store/articles"

const ArticleForm = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [article, setArticle] = useState('')
    const [errors, setErrors] = useState([])


    const validator = () => {
        let error = []

        if(title.length > 80) {
            error.push('. : Please enter a title shorter than 80 characters.')
        }

        if(description.length > 150) {
            error.push('. : Source URL cannot exceed 50 characters')
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
            setErrors(errorsArr)
        } else{
            const projectInfo = {
                user_id:sessionUser.id,
                title,
                description,
                article
            }
            const data = await dispatch(postArticle(projectInfo))
            if(data) {
                setErrors(data)
            } else {
                history.push('/home')
            }
        }
    }

    return <div>
        <div className="errors">
                    {errors.map((error, ind) => (
                    <div key={ind}>{error.split(':')[1]}</div>
                ))}
                </div>
        <form className='project-form' onSubmit={handleSubmit}>
                    <input
                    className='article-title-input'
                    placeholder='Title'
                    required
                    value = {title}
                    onChange= {(e) => setTitle(e.target.value)}/>
                    <input
                    className='article-description-input'
                    placeholder='Source'
                    required
                    value={description}
                    onChange= {(e) => setDescription(e.target.value)}/>
                    <input
                    className='article-input'
                    placeholder='Factoid'
                    required
                    value = {article}
                    onChange= {(e) => setArticle(e.target.value)}/>
                    <button type='submit'

                        className="article-submit-button">Submit</button>
                </form>
    </div>
}
export default ArticleForm;
