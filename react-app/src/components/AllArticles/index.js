import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllArticles } from '../../store/articles'
import Article from "./Article"
import './AllArticles.css'
import './AllArticlesRevision.css'

export default function AllArticles() {
    let dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { articles } = useSelector(state => state.articles)
    const [artIdx, setArtIdx] = useState(0)
    const [direction, setDirection] = useState('a')
    const [bool, setBool] = useState(false)
    const [showBehindArticleForward, setShowBehindArticleForward] = useState(false)

    useEffect(() => {
        setBool(true)
        dispatch(getAllArticles())
    }, [dispatch]);



    const prevArticle = () => {
        if (direction !== 'a') {
            return;
        }
        if (artIdx < 1) {
            setDirection('prev')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(articles.length - 1)
                    setShowBehindArticleForward(false)
                }, 250);
            }, 250)

        } else {
            setDirection('prev')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(artIdx - 1)
                    setShowBehindArticleForward(false)
                }, 250);
            }, 250)
        }
    }
    const nextArticle = () => {
        if (direction !== 'a') {
            return;
        }
        if (artIdx >= articles.length - 1) {
            setDirection('next')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(0)
                    setShowBehindArticleForward(false)
                }, 250);
            }, 250)

        } else {
            setDirection('next')
            setTimeout(() => {
                setShowBehindArticleForward(true)
                setTimeout(() => {
                    setDirection('a')
                    setArtIdx(artIdx + 1)
                    setShowBehindArticleForward(false)
                }, 250);
            }, 250)

        }
    }
    const article = articles && articles.length > 0 && articles[artIdx]
    const behindArticle = articles && articles.length > 0 && direction !== 'a' && (direction === 'prev' ? articles[artIdx - 1 >= 0 ? artIdx - 1 : articles.length - 1] : articles[artIdx + 1 < articles.length ? artIdx + 1 : 0]);
    if (articles?.length > 0) {

        return (<div className="full-container">
            <div className="all-articles-page">
                <div className="cards-container">
                    <div className="carbtn" onClick={prevArticle}>{'<'}</div>
                    {articles &&
                        <>
                            <MemoArticle article={article} idx={artIdx} direction={direction} bool={bool} zIndex={0} parent={true} />
                            {behindArticle &&
                                <MemoArticle article={behindArticle} idx={artIdx - 1} bool={bool} zIndex={showBehindArticleForward ? 1000 : -1} parent={false} />
                            }
                        </>
                    }
                    <div className="carbtn" onClick={nextArticle}>{'>'}</div>
                </div>
                <div className="pagebtns">{user ? <NavLink to={`/declare`}><div className="declarebtn">Declare a Truth</div></NavLink> : null}
                    <NavLink to={`/all`}><div className="declarebtn">See All Claims</div></NavLink>
                </div>
            </div>
        </div>
        )
    }

    return <div></div>

}

const MemoArticle = memo(Article)
