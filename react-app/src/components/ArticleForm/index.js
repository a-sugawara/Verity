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
    const [image_url, setImage] = useState('')
    const [errors, setErrors] = useState([])


    const validator = () => {
        let error = []

        if(title.length > 80) {
            error.push('. : Please enter a title shorter than 80 characters.')
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
            setErrors(errorsArr)
        } else{
            const projectInfo = {
                user_id:sessionUser.id,
                title,
                description,
                article,
                image_url
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
        <form className='project-form' >
            <div className="errors">
                {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
            ))}
            </div>
            <div className="form-title">Declare a Fact</div>
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
            className='textarea-input input'
            placeholder='Factoid'
            required
            value = {article}
            onChange= {(e) => setArticle(e.target.value)}/>
            <input
            className='article-input input'
            placeholder='Image URL'
            required
            value = {image_url}
            onChange= {(e) => setImage(e.target.value)}/>
            <div onClick={handleSubmit}
                className="navbtn">Submit</div>
        </form>
    </div>
}
export default ArticleForm;
