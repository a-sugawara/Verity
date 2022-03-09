import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{useParams } from 'react-router-dom'
import { searchArticles } from "../../store/articles";
import Tile from "../AllArticlesList/Tile.js"


export default function SearchedArticles(){
    const {term} = useParams()
    let dispatch = useDispatch()
    const {searchedArticles:articles} = useSelector(state => state.articles)
    useEffect(()=>{
        dispatch(searchArticles(term))},
        [dispatch,term]
    )
    let list
    if (articles?.length > 0){
        list = articles?.sort((a, b) => b.ratings.sum - a.ratings.sum)
        .map((article, idx) =><Tile article={article} idx={idx}/>)
    }
    return (
        <div className='list-container'>
            {list}
        </div>
    )
}
