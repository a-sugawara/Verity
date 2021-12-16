import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink, useParams } from 'react-router-dom'
import './OneArticle.css'
import { getOneArticle } from "../../store/articles";
import ArticleEditModal from "../ArticleEditModal"

export default function OneArticle(){
    const sessionUser = useSelector(state => state.session.user)
    const {currentArticle: article} = useSelector(state => state.articles)
    const {id} = useParams()


    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneArticle(id))
    },[dispatch])

    const rating = article?.ratings.find(rating => rating.user_id === sessionUser.id)
    const averageRating = (article?.ratings.reduce((acc, a)=>acc+a.review,0))/(article?.ratings.length) || 0
    console.log(averageRating,"8888888888888888888888888888")


    return<div className="cards-container">
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
        </div>
    </div>

}
