import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  let articles
  let proRating
  let comments
  if (user) {
    articles = user.article? Object.values(user.article):null
    comments = user.comment? Object.values(user.comment):null
    proRating =(articles?.reduce( (acc, article) => acc + article.ratings.sum,0))/(articles?.reduce( (acc, article) => acc + article.ratings.len,0))
  }
  if (!user) {
    return null;
  }


  return (
    <div className="full-container">
      <div className="profile-page">
        <div className="pro-user"> {user.username}</div>
        <div className="pro-cna-container">
          <div className="pro-comment-container">
            <div className="pro-comment-title">Recent comments</div>
            {/* <div className="comments"> */}
              {comments?.length > 3? comments?.map(comment => <div className="pro-comment"><NavLink to={`/articles/${comment.article_id}`}> <div className="p-comment">{"- "}{comment.comment}</div><div className="comment-title">From: {comment.articleTitle}</div></NavLink></div>).slice(comments?.length -4,comments?.length -1):comments?.map(comment => <div className="pro-comment"><NavLink to={`/articles/${comment.article_id}`}> <div className="p-comment">{"- "}{comment.comment}</div><div className="comment-title">From: {comment.articleTitle}</div></NavLink></div>)}
            {/* </div> */}
            <div></div>
          </div>
            <div className="pro-score-container">
              <div>
                {proRating? <div className="pro-score">User Score: {Math.round(proRating)}%</div>:"Not enough info"}
              </div>
              {proRating && (proRating >0 && proRating < 50)? <img alt="badgeimg" className="badge" src="https://cdn.discordapp.com/attachments/920285009099751524/926305067605315604/cap.png"/>:null}
              {proRating && (proRating >0 && proRating < 50)? <div className="userlabel">This user has been deemed an arbiter of untruth</div>:null}
              {proRating && (proRating >75)? <img alt="badgeimg2" className="badge" src="https://cdn.discordapp.com/attachments/920285009099751524/926389160141529148/truthbadge.png"/>:null}
              {proRating && (proRating >75)? <div className="userlabel">This user has been deemed an paragon of truth</div>:null}
            </div>
        </div>
        <div>
        <div className="pro-articles">
            {articles?.map((article,idx) => <NavLink key={idx} to={`/articles/${article.id}`}><div className="pro-img-holder">
                <div>{article.title}</div>
                <img  alt="proimg" className="pro-img" src={article.images[0]}/>
            </div></NavLink>)}
        </div>
        </div>
      </div>
    </div>
  );
}
export default User;
