import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink } from 'react-router-dom'
import './AllArticles.css'
import './AllArticlesRevision.css'

export default function AllArticles(){
    const {articles:articles} = useSelector(state => state.articles)
    const [artIdx, setArtIdx] = useState(0)
    const [direction, setDirection] = useState('')
    const prevArticle = () =>{
        if(artIdx < 1 ){
            setDirection('prev')
            setTimeout(() => {
                setArtIdx(articles.length-1)
                setDirection('')
              }, 300);

        }else{
            setDirection('prev')
            setTimeout(() => {
                setArtIdx(artIdx-1)
                setDirection('')
              }, 300);

        }
    }
    const nextArticle = () =>{
        if(artIdx >= articles.length-1 ){
            setDirection('next')
            setTimeout(() => {
                setArtIdx(0)
                setDirection('')
              }, 300);

        }else{
            setDirection('next')
            setTimeout(() => {
                setArtIdx(artIdx+1)
                setDirection('')
              }, 300);

        }
    }
    let dispatch = useDispatch()
    // let articles = useSelector(state => state.articles.articles)
    console.log(articles)
    console.log(direction)
    let cards
    if (articles?.length > 0){
        cards = articles?.map((article, idx) =><div key={idx} className={`article-card-container`}>
            <div className={`article-card test-${direction}`}>
                <div className="img-description">
                    <div className="img-holder">
                        <img
                            src="https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"
                            className="card-img" />
                    </div>
                    <div className="card-description">
                    <div className="article-description">
                        <a target="_blank" href={article.description}>Source</a>
                    </div>
                    Posted by: {article.username}<br/>{article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating<br/> {article.comments} comments
                    </div>
                </div>
                <div className="card-info">
                    <div className="card-title">
                        {article.title}
                    </div>
                    <div className="card-article">
                        {article.article}
                        <br/>
                        <p></p>
                        <p></p>
                        <NavLink to={`/articles/${article.id}`}>
                        <div className="navbtn">Rate and Comment</div>
                        </NavLink>
                    </div>
                </div>


            {/* <NavLink to={`/articles/${article.id}`}>
                <div className="article-title-bar">
                    <div className="article-title">{article.title.toUpperCase()}</div>
                </div>
            </NavLink>
                <div className="article">
                    <div className="article-text">
                        {article.article}
                    </div>
                    <div className="article-details">
                        Posted by: {article.username} - {article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating - {article.comments} comments
                    </div>
            <div className="article-description">
                <a target="_blank" href={article.description}>Source</a>
            </div>
                </div> */}
            </div>
        </div>
        )
        return <div className="cards-container">
        <div className="carbtn" onClick={prevArticle}>{'<'}</div>
        {cards[artIdx]}
        <div className="carbtn" onClick={nextArticle}>{'>'}</div>
        </div>
    }

    return <div></div>

}
