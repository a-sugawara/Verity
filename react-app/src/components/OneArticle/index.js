import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink, useParams,useHistory } from 'react-router-dom'
import './OneArticle.css'
import { getOneArticle, addRating,putRating } from "../../store/articles";
import ArticleEditModal from "../ArticleEditModal"
import ArticleDeleteModal from "../DeleteArticleModal";

export default function OneArticle(){
    const [rate,setRate] = useState('')
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const {currentArticle: article} = useSelector(state => state.articles)
    const {id} = useParams()

    if(!sessionUser){
        history.push('/')
    }

    let userRating
    let checkedRating = article?.ratings.find(rating => rating.user_id === sessionUser?.id)


    let userButtons
    if(sessionUser?.id === article?.user_id){
        userButtons =  <div className="navbtn-holder-col">
        <ArticleEditModal />
        <ArticleDeleteModal />
    </div>
    }
    if(checkedRating){
        if(checkedRating.rating ===1) userRating='Your previous selection was "false"'
        if(checkedRating.rating ===50) userRating='Your previous selection was "maybe"'
        if(checkedRating.rating ===100) userRating='Your previous selection was "true"'
    }

    let selection
    if(rate === 1){
        selection ="You have selected False"
    }else if(rate===50){
        selection = "You have selected Maybe"
    }else if(rate=== 100){
        selection = "You have selected True"
    }else if(rate=== "no selection"){
        selection = "You have not selected a degree of verity"
    }



    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneArticle(id))
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!rate){
            setRate("no selection")
            return

        }

        const rating = {
            user_id:sessionUser?.id,
                article_id:+id,
                rating:+rate
            }
            if(checkedRating){
                dispatch(putRating(rating, checkedRating.id,checkedRating.rating))

                setRate('')
                return
            }
            dispatch(addRating(rating))
            setRate('')
    }
                        const falser = () =>{
                            setRate(1)
                        }
                        const mayber = () =>{
                            setRate(50)
                        }
                        const truther = () =>{
                            setRate(100)
                        }


                        const rating = article?.ratings.find(rating => rating.user_id === sessionUser?.id)
                        const averageRating = (article?.ratings.reduce((acc, a)=>acc+a.rating,0))/(article?.ratings.length) || 0



                        return<div className="cards-container">
    <div className={`article-card-container`}>
        <div className="center-column">
        <div className='bg1'></div>
        <div className={`article-card`}>
            <div className="img-description">
                <div className="img-holder">
                    <img
                        src={article?.images[0]||"https://cdn.discordapp.com/attachments/920285009099751524/921089742756532284/unknown.png"}
                        className="card-img" />
                </div>
                <div className="card-description">
                <div className="cardbtn">
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
                    <br/>
                    <br/>
                    {article?.user_id === sessionUser?.id?userButtons:null}
                    <div>
                        <div>

                            {averageRating>75? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/921974219733082173/Verified.png"/>:null}
                            {averageRating>0 && averageRating<50? <img className="verified-img" src="https://cdn.discordapp.com/attachments/920285009099751524/922093439854731274/UnVerifiedlogo.png"/>:null}
                        </div>
                        <div>
                            {averageRating>75? <span className='weak-grey'>This has been deemed an article of truth</span>:null}
                            {averageRating>0 && averageRating<50? <span className="weak-grey">This has been deemed an article of untruth</span>:null}
                        </div>
                    </div>
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
        <div className="btnbox-white">
            <div
                className="btn btn-red">
                    <div className="fals-grey"
                        onClick={falser}
                        >
                        False
                    </div>

                </div>
            <div
                className="btn btn-yellow">
                    <div className="mayb-grey"
                        onClick={mayber}
                        >
                        Maybe
                    </div>
                </div>
            <div
                className="btn btn-green">
                    <div className="truth-grey"
                        onClick={truther}
                        >
                        True
                    </div>
                </div>
        </div>
        {rate?`${selection}`:"Please select degree of verity"}
        <br/>
        <br/>
        <br/>
        <br/>
        {userRating}
            <input
            hidden
            required
            placeholder="Accuracy Rating"
            value={rate}
            onChange={(e) =>setRate(e.target.value)}
            />
            {rate?<div
                style={{"margin" : "1rem"}}
                className="navbtn"
                onClick={handleSubmit}>Rate</div>:null}

        </div>
        </div>
    </div>

}