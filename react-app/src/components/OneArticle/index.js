import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink, useParams } from 'react-router-dom'
import './OneArticle.css'
import { getOneArticle, addRating } from "../../store/articles";
import ArticleEditModal from "../ArticleEditModal"
import ArticleDeleteModal from "../DeleteArticleModal";

export default function OneArticle(){
    const [rate,setRate] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const {currentArticle: article} = useSelector(state => state.articles)
    const {id} = useParams()


    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneArticle(id))
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const errorsArr = validator()
        // if(errorsArr.length) {
        //     setErrors(errorsArr)
        // } else{
        //     const projectInfo = {
        //         user_id:sessionUser.id,
        //         title,
        //         description,
        //         article
        //     }
        //     const data = await dispatch(postArticle(projectInfo))
        //     if(data) {
        //         setErrors(data)
        //     } else {
        //         history.push('/home')
        //     }
        const rating = {
            user_id:sessionUser.id,
            article_id:+id,
            rating:+rate
        }
        dispatch(addRating(rating))
        }


    const rating = article?.ratings.find(rating => rating.user_id === sessionUser.id)
    const averageRating = (article?.ratings.reduce((acc, a)=>acc+a.rating,0))/(article?.ratings.length) || 0
    console.log(averageRating,"8888888888888888888888888888")


    return<div className="cards-container">
    <div className={`article-card-container`}>
        <div>
    <div className={`article-card`}>
        <div className="img-description">
            <div className="img-holder">
                <img
                    src="https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"
                    className="card-img" />
            </div>
            <div className="card-description">
            <div className="article-description">
                <a target="_blank" href={article?.description}>Source</a>
            </div>
            Posted by: {article?.username}<br/>{averageRating}% accuracy rating
            </div>
        </div>
        <div className="card-info">
            <div className="card-title">
                {article?.title}
            </div>
            <div className="card-article">
                {article?.article}
                <br/>
                <p></p>
                <p></p>
            </div>
        </div>
    {/* </div>
    <div className="cards-container">
        <div className={`article-card-container`}>
            <div className={`article-card`}>
                <div className="article-title-bar">
                    <div className="article-title">{article?.title.toUpperCase()}</div>
                </div>
                <div className="article">
                    <div className="article-text">
                        {article?.article}
                    </div>
                    <div className="article-description">
                        <a target="_blank" href={article?.description}>Source</a>
                    </div>
                    <div className="article-details">
                        Posted by: {article?.username} - {averageRating}% accuracy rating
                    </div>
                </div>
            </div>
        </div>
        <div className="navbtn-holder-col">
            <ArticleEditModal />
            <div className="navbtn">Delete</div>
        </div> */}
    </div>
        <input
        required
        placeholder="Accuracy Rating"
        value={rate}
        onChange={(e) =>setRate(e.target.value)}
        />
        <button onClick={handleSubmit}>Rate</button>
           <div className="navbtn-holder-col">
            <ArticleEditModal />
            <ArticleDeleteModal />
        </div>
    </div>
    </div>
    </div>

}
