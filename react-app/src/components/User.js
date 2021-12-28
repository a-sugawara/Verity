import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  console.log(articles)

  return (
    <div className="profile-page">
      <div className="pro-user"> {user.username}</div>
      <div className="pro-cna-container">
        <div className="pro-comment-container">
          <div className="pro-comment-title">Recent comments</div>
          {/* <div className="comments"> */}
            {comments?.length > 3? comments?.map(comment => <div className="pro-comment"> <div className="p-comment">{"- "}{comment.comment}</div><div className="comment-title">From: {comment.articleTitle}</div></div>).slice(comments?.length -4,comments?.length -1):comments?.map(comment => <div className="pro-comment"> <div className="p-comment">{"- "}{comment.comment}</div><div className="comment-title">From: {comment.articleTitle}</div></div>)}
          {/* </div> */}
        </div>
          <div className="pro-score-container">
            <div>
              {proRating?<div className="pro-score">User Score: {proRating}%</div>:"Not enough info"}
            </div>
          </div>
      </div>
      <div>
      <div className="pro-articles">
          {articles?.map(article => <div className="pro-img-holder">
              <div>{article.title}</div>
              <img  className="pro-img" src={article.images[0]}/>
          </div>)}
      </div>
      </div>
    </div>
  );
}
export default User;
