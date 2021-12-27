import React, { useEffect, useState, memo } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink } from 'react-router-dom'
import "./AllArticlesList.css"


export default function AllArticlesList(){
    const user = useSelector(state => state.session.user)
    const {articles:articles} = useSelector(state => state.articles)
    let list
    if (articles?.length > 0){
        list = articles?.sort((a, b) => b.ratings.sum - a.ratings.sum).map((article, idx) =><div key={idx} className={`list-card-container`}>

                    <div className="list-title">
                        <NavLink to={`/articles/${article.id}`}>
                            <div className="titlebtn">{article.title}</div>
                        </NavLink>
                    </div>
                    <div className="list-description">
                        Posted by: {article.username}<br/>{article.ratings.len >0?Math.round(article.ratings.sum/article.ratings.len):0}% accuracy rating<br/> {article.comments} comments
                        <div className="navbtn">
                            <a target="_blank" href={article.description}>Source</a>
                        </div>
                    </div>
                    <div className="list-article">
                        {article.article.slice(0,50) }{"..."}


                    </div>
                    <div className="v-score">
                        <div className="list-badges">

                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                        </div>
                        <br/>
                        {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )===0? <span className='weak-grey'>This has Not Been voted on yet</span>:null}
                        {/* {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <span className='weak-grey'>This has been deemed an article of truth</span>:null}
                        {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <span className='weak-grey'>This has been deemed an article of untruth</span>:null}
                        {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>=50 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<=75? <span className='weak-grey'>This is still up for debate</span>:null} */}

                    </div>
                </div>
        )
    }
    return (
        <div className='list-container'>
            {list}
        </div>
    )
}
