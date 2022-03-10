import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{ NavLink, useParams,useHistory } from 'react-router-dom'
import { io } from 'socket.io-client';
import './OneArticle.css'
import  { getOneArticle, addRating,putRating, postComment, deleteComment , addNewComment, removeComment } from "../../store/articles";

import ArticleEditModal from "../ArticleEditModal"
import ArticleDeleteModal from "../DeleteArticleModal";


let socket

export default function OneArticle(){
    const [rate,setRate] = useState('')
    const [comment, setComment] = useState('')
    const [errBool, setErrBool] = useState(false)
    const [errors, setErrors] = useState([])
    const [commentConfrim, setCommentConfrim] = useState('')
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const {currentArticle: article} = useSelector(state => state.articles)
    const {id} = useParams()

    if(!sessionUser){
        history.push('/')
    }
    const validator = () => {
        let error = []

        if(comment.length > 250) {
            error.push('. : Comment cannot exceed 250 characters.')
        }
        return error;
    }

    let userRating
    let checkedRating = article?.ratings.find(rating => rating.user_id === sessionUser?.id)


    let userButtons
    if(sessionUser?.id === article?.user_id){
        userButtons =  <div className="navbtn-holder-col">
        <ArticleEditModal article={article}/>
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
        socket = io();

        socket.on("add_com", (comment)=>{
            dispatch(addNewComment(comment))})

        socket.on("del_com", (commentid)=>{dispatch(removeComment(commentid))})

        return (() => {
            socket.disconnect()
        })
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
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const errorsArr = validator()
        if(errorsArr.length) {
            setErrBool(true)
            setErrors(errorsArr)
        }else{
            setErrBool(false)
            const commentInfo = {
                user_id:sessionUser?.id,
                    article_id:+id,
                    comment
                }
                dispatch(postComment(commentInfo))
                setComment('')
            }
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
    const handleCommentDelete = (commentId)=>{
        dispatch(deleteComment(commentId))
        setCommentConfrim('')
    }


    const averageRating = (article?.ratings.reduce((acc, a)=>acc+a.rating,0))/(article?.ratings.length) || 0



    return(
    <div className="scards-container">
        <div className={`article-card-container`}>
            <div className="center-column">
            <div className='bg1'></div>
            <div className={`article-card article-card-a`}>
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
                    <div className="flexrow">Posted by: <NavLink to={`/users/${article?.user_id}`}>{article?.username}</NavLink></div><br/>{Math.round(averageRating)}% accuracy rating
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
            <br/>
            <br/>
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
            <div className="comments-box">
            <div className={`errors errors-${errBool}`}>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error.split(':')[1]}</div>
                ))}
                </div>
                    <div className="comments-box-title" >
                        <div>Comments</div>
                        <div className="comments-box-circles">
                            <div className="tinycircle red"></div>
                            <div className="tinycircle yellow"></div>
                            <div className="tinycircle green"></div>
                        </div>
                    </div>
                <div className="screen-holder">
                    <div className="screen">
                        {article?.comments.length ===0?<div className="comment">Be the first to spark the discussion!</div>:null}
                        {article?.comments.map(comment => <div
                                    onMouseLeave={() => setCommentConfrim('')}
                                    className="comment">
                            <div>{comment.comment}</div>
                            <div>
                                <div className="comment-user">
                                    Posted by: {comment.username}
                                {sessionUser?.id === comment.user_id?<div>
                                    {comment.id === commentConfrim?<div
                                        className="delete-img"
                                        onClick={() => (setCommentConfrim(''))}></div>:<div
                                        className="delete-img-closed"
                                        onMouseEnter={() => setCommentConfrim(comment.id)}
                                        ></div>}
                                    {comment.id === commentConfrim?<div className={`comment-options comment-options-true`}>
                                        <div>Confirm delete?</div>
                                        <div
                                            onClick={() => handleCommentDelete(comment.id)}
                                            className={`cardbtn`}>Delete</div>
                                        <div  onClick={() => setCommentConfrim('')}
                                            className={`comment-closer`}>x</div>
                                    </div>:<div className={`comment-options`}>
                                    </div>}
                                </div>:null}
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <form
                        onSubmit={(e)=>handleCommentSubmit(e)}
                        className="screen-input-holder">
                        <input
                            value={comment}
                            onChange= {(e) => setComment(e.target.value)}
                            required
                            placeholder="Comment here..."
                            className="screen-input"/>
                        <button
                            className="cardbtn smaller"
                            >submit</button>
                    </form>
                </div>
            </div>
        </div>)

}
