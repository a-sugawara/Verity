import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink } from 'react-router-dom'
import './AllArticles.css'

export default function AllArticles({articles}){
    let dispatch = useDispatch()
    // let articles = useSelector(state => state.articles.articles)
    console.log(articles)
    let cards
    if (articles?.length > 0){
        cards = articles?.map((article, idx) =><div key={idx} className="article-card-container">
            <div className="article-card">
                <div className="article-title-bar">
                    <div className="article-title">{article.title.toUpperCase()}</div>
                </div>
                <div className="article">
                    <div className="article-text">
                        {article.article}
                    </div>
                    <div className="article-description">
                        <a href={article.description}>Source</a>
                    </div>
                    <div className="article-details">
                        Posted by: {article.username} - {article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating - {article.comments} comments
                    </div>
                </div>
            </div>
        </div>
        )
        return <div className="cards-container">
        {cards[1]}
        </div>
    }

    return <div></div>

}
