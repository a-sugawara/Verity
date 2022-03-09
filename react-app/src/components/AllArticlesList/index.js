import React from "react";
import { useSelector} from 'react-redux';

import "./AllArticlesList.css"
import Tile from "./Tile"


export default function AllArticlesList(){
    const {articles} = useSelector(state => state.articles)
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
