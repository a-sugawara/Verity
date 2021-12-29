import React, { useEffect, useState, memo } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink } from 'react-router-dom';
import {getAllArticles} from'../../store/articles'
import './AllArticles.css'
import './AllArticlesRevision.css'

export default function AllArticles(){
    let dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {articles:articles} = useSelector(state => state.articles)
    const [artIdx, setArtIdx] = useState(0)
    const [direction, setDirection] = useState('a')
    const [bool, setBool] = useState(false)
    const [showBehindArticleForward, setShowBehindArticleForward] = useState(false)

    useEffect(() => {
        setBool(true)
        dispatch(getAllArticles())
      }, []);



    const prevArticle = () =>{
        if (direction !== 'a') {
            return;
        }
        if(artIdx < 1 ){
            setDirection('prev')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(articles.length-1)
                    setShowBehindArticleForward(false)
                  }, 250);
            }, 250)

        }else{
            setDirection('prev')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(artIdx-1)
                    setShowBehindArticleForward(false)
                }, 250);
            }, 250)
        }
    }
    const nextArticle = () =>{
        if (direction !== 'a') {
            return;
        }
        if(artIdx >= articles.length-1 ){
            setDirection('next')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(0)
                    setShowBehindArticleForward(false)
                  }, 250);
            }, 250)

        }else{
            setDirection('next')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(artIdx+1)
                    setShowBehindArticleForward(false)
                  }, 250);
            }, 250)

        }
    }
    // let articles = useSelector(state => state.articles.articles)

    const article = articles && articles.length>0 && articles[artIdx]
    const behindArticle = articles && articles.length >0 && direction !== 'a' && (direction === 'prev' ? articles[artIdx-1 >= 0 ? artIdx -1 : articles.length-1] : articles[artIdx+1 < articles.length ? artIdx + 1 : 0]);
    let cards
    if (articles?.length > 0){
    //     cards = articles?.map((article, idx) =><div key={idx} className={`article-card-container`}>
    //         <div className={`article-card test-${direction} article-card-${bool} `}>
    //             <div className="img-description">
    //                 <div className="img-holder">
    //                     <img
    //                         src={article.images[0]||"https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"}
    //                         className="card-img" />
    //                 </div>
    //                 <div className="card-description">
    //                 <div className="navbtn">
    //                     <a target="_blank" href={article.description}>Source</a>
    //                 </div>
    //                 Posted by: {article.username}<br/>{article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating<br/> {article.comments} comments
    //                 </div>
    //             </div>
    //             <div className="card-info">
    //                 <div className="card-title">
    //                     {article.title}
    //                 </div>
    //                 <div className="card-article">
    //                     {article.article}
    //                     <br/>
    //                     <p></p>
    //                     <p></p>
    //                     <NavLink to={`/articles/${article.id}`}>
    //                     <div className="navbtn">Rate and Comment</div>
    //                     </NavLink>
    //                     <br/>
    //                     <br/>
    //                     <br/>
    //                     <br/>
    //                     {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
    //                     {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
    //                     <br/>
    //                     {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <span className='weak-grey'>This has been deemed an article of truth</span>:null}
    //                     {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <span className='weak-grey'>This has been deemed an article of untruth</span>:null}

    //                 </div>
    //             </div>


    //         {/* <NavLink to={`/articles/${article.id}`}>
    //             <div className="article-title-bar">
    //                 <div className="article-title">{article.title.toUpperCase()}</div>
    //             </div>
    //         </NavLink>
    //             <div className="article">
    //                 <div className="article-text">
    //                     {article.article}
    //                 </div>
    //                 <div className="article-details">
    //                     Posted by: {article.username} - {article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating - {article.comments} comments
    //                 </div>
    //         <div className="article-description">
    //             <a target="_blank" href={article.description}>Source</a>
    //         </div>
    //             </div> */}
    //         </div>
    //     </div>
    //     )
        return (<div className="full-container">
            <div className="all-articles-page">
                <div className="cards-container">
                    <div className="carbtn" onClick={prevArticle}>{'<'}</div>
                        {articles &&
                            <>
                                <MemoArticle article={article} idx={artIdx} direction={direction} bool={bool} zIndex={0} parent={true} />
                                { behindArticle &&
                                    <MemoArticle article={behindArticle} idx={artIdx-1} bool={bool} zIndex={showBehindArticleForward ? 1000 : -1} parent={false} />
                                }
                            </>
                        }
                    <div className="carbtn" onClick={nextArticle}>{'>'}</div>
                </div>
                <div className="pagebtns">{user? <NavLink to={`/declare`}><div className="declarebtn">Declare a Truth</div></NavLink>:null}
                    <NavLink to={`/all`}><div className="declarebtn">See All Claims</div></NavLink>
                </div>
            </div>
        </div>
        )
    }

    return <div></div>

}

const Article = ({ article, idx, bool, zIndex, parent, direction='a' }) => {
    return (
    <div key={idx} className={parent ? `article-card-container` : `article-card-container-next`} style={{ zIndex, position: parent ? 'relative' : 'absolute' }}>

        <div className={`article-card test-${direction} article-card-${bool} article-card-${direction} `}>
            <div className="img-description">
                <div className="img-holder">
                    <img
                        src={article.images[0]||"https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"}
                        className="card-img" />
                </div>
                <div className="card-description">
                    <div className="cardbtn">
                        <a target="_blank" href={article.description}>Source</a>
                     </div>
                     <div className="flexrow">Posted by: <NavLink to={`/users/${article.user_id}`}>{article.username}</NavLink></div><br/>{article.ratings.len >0?article.ratings.sum/article.ratings.len:0}% accuracy rating<br/> {article.comments} comments
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
                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                        </div>
                        <div>
                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>75? <span className='weak-grey'>This has been deemed an article of truth</span>:null}
                            {(article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )>0 && (article.ratings.len >0?article.ratings.sum/article.ratings.len:0 )<50? <span className='weak-grey'>This has been deemed an article of untruth</span>:null}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const MemoArticle = memo(Article)
