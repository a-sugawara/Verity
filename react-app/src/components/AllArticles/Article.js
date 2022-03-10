import React from "react";
import { NavLink } from 'react-router-dom';

import './AllArticles.css'
import './AllArticlesRevision.css'

const Article = ({ article, idx, bool, zIndex, parent, direction = 'a' }) => {
    let avg = article.ratings.sum/ article.ratings.len
    return (
        <div key={idx} className={parent ? `article-card-container` : `article-card-container-next`} style={{ zIndex, position: parent ? 'relative' : 'absolute' }}>

            <div className={`article-card test-${direction} article-card-${bool} article-card-${direction} `}>
                <div className="img-description">
                    <div className="img-holder">
                        <img alt="cardimg"
                            src={article.images[0] || "https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"}
                            className="card-img" />
                    </div>
                    <div className="card-description">
                        <div className="cardbtn">
                            <a target="_blank" rel="noreferrer" href={article.description}>Source</a>
                        </div>
                        <div className="flexrow">Posted by: <NavLink to={`/users/${article.user_id}`}>{article.username}</NavLink></div><br />{article.ratings.len > 0 ? Math.round(article.ratings.sum / article.ratings.len) : 0}% accuracy rating<br /> {article.comments} comments
                    </div>
                </div>
                <div className="card-info">
                    <div className="card-title">
                        {article.title}
                    </div>
                    <div className="card-article">
                        {article.article}
                        <NavLink to={`/articles/${article.id}`}>
                            <div className="cardbtn">Rate and Comment</div>
                        </NavLink>
                        <div>
                            <div>
                                {(article.ratings.len > 0 ? avg : 0) > 75 ? <img alt="checkmark" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png" /> : null}
                                {(article.ratings.len > 0 ? avg : 0) > 0 && (article.ratings.len > 0 ? avg : 0) < 50 ? <img alt="xmark" className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png" /> : null}
                            </div>
                            <div>
                                {(article.ratings.len > 0 ? avg : 0) > 75 ? <span className='weak-grey'>This has been deemed an article of truth</span> : null}
                                {(article.ratings.len > 0 ? avg : 0) > 0 && (article.ratings.len > 0 ? avg : 0) < 50 ? <span className='weak-grey'>This has been deemed an article of untruth</span> : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
