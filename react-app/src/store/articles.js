// constants
const SET_ARTICLES = 'article/SET_ARTICLES';
const SET_ONE_ARTICLE = 'article/SET_ONE_ARTICLE';
const ADD_ARTICLE = 'article/ADD_ARTICLE';
const EDIT_ARTICLE = 'article/EDIT_ARTICLE';
const DELETE_ARTICLE = 'article/DELETE_ARTICLE';

const ADD_RATING = 'rating/ADD_RATING';
const EDIT_RATING = 'rating/EDIT_RATING';

const ADD_COMMENT = 'article/ADD_COMMENT';
const EDIT_COMMENT = 'article/EDIT_COMMENT';
const DELETE_COMMENT = 'article/DELETE_COMMENT';

const GET_SEARCHED = "article/GET_SEARCHED"

const setArticles = (payload) => ({
  type: SET_ARTICLES,
  payload
});

const setOneArticle = (payload) => ({
  type: SET_ONE_ARTICLE,
  payload
});

const addNewArticle = (payload) => ({
  type: ADD_ARTICLE,
  payload
})
const addEditedArticle = (payload) => ({
  type: EDIT_ARTICLE,
  payload
})
const removeArticle = (payload) => ({
  type: DELETE_ARTICLE,
  payload
})
const setSearchedArticles = (articles) => {
  return {
    type: GET_SEARCHED,
    payload: articles
  }
}

const addNewRating = (payload) => ({
  type:ADD_RATING,
  payload
})
const editRating = (payload, oldRating) => ({
  type:EDIT_RATING,
  payload,
  oldRating
})
export const addNewComment = (payload) => ({
  type: ADD_COMMENT,
  payload
})
const addEditedComment = (payload) => ({
  type: EDIT_COMMENT,
  payload
})
export const removeComment = (payload) => ({
  type: DELETE_COMMENT,
  payload
})


export const getAllArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles');

  if (response.ok) {
    const data = await response.json();
    dispatch(setArticles(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const getOneArticle = (id) => async (dispatch) => {

  const response = await fetch(`/api/articles/${id}`);

  if (response.ok) {
    const data = await response.json();

    dispatch(setOneArticle(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const postArticle = (articleInfo) => async (dispatch) => {

  const response = await fetch(`/api/articles/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      articleInfo
    )
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addNewArticle(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const editArticle = (articleInfo, id) => async (dispatch) => {

  const response = await fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      articleInfo
    )
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addEditedArticle(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const searchArticles = (term) => async (dispatch) => {
  const response = await fetch(`/api/articles/discover/${term}`);

  if (response.ok) {
      const projects = await response.json();
      dispatch(setSearchedArticles(projects));
  }
};
export const deleteArticle = (id) => async (dispatch) => {

  const response = await fetch(`/api/articles/${id}`, {
    method: 'DELETE',
  })
  if(response.ok) {
    dispatch(removeArticle(id))
  } else if (response.status < 500){
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const addRating = (rating) => async (dispatch) => {

  const response = await fetch(`/api/ratings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      rating
    )
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addNewRating(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const putRating = (rating,id,oldRating) => async (dispatch) => {

  const response = await fetch(`/api/ratings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      rating
    )
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(editRating(data,oldRating))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const postComment = (commentInfo) => async (dispatch) => {

  const response = await fetch(`/api/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      commentInfo
    )
  })

  if (response.ok) {
    const data = await response.json();
    // dispatch(addNewComment(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const editComment = (commentInfo, id) => async (dispatch) => {

  const response = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      commentInfo
    )
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addEditedComment(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
export const deleteComment = (id) => async (dispatch) => {

  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  })
  if(response.ok) {
    // dispatch(removeComment(id))
  } else if (response.status < 500){
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

const initialState = { articles:null, currentArticle:null, searchedArticles:null}

export default function reducer(state = initialState, action) {
    let newState
  switch (action.type) {
    case SET_ARTICLES:
        newState = {...state}
        return { ...newState, ...action.payload }
    case GET_SEARCHED:
        newState = {...state}
        return { ...newState, ...action.payload }
    case SET_ONE_ARTICLE:
      newState = { ...state, currentArticle: action.payload }
      return newState
    case ADD_ARTICLE:
      newState = { ...state}
      newState.articles.push(action.payload)
      return newState
    case EDIT_ARTICLE:
      newState = { ...state}
      const articleidx = newState.articles.findIndex(article => article.id === action.payload.id);
      newState.currentArticle =action.payload
      newState.articles[articleidx].description = action.payload.description
      newState.articles[articleidx].title = action.payload.title
      newState.articles[articleidx].article = action.payload.article
      return newState
    case DELETE_ARTICLE:
      newState = { ...state}
      const articleDelidx = newState.articles.findIndex(article => article.id === +action.payload);
      newState.articles = newState.articles.splice(articleDelidx, 1)
      newState.articles = newState.articles.slice()
      newState.currentArticle = null
      return newState
    case ADD_RATING:
      newState = { ...state}
      const reviewidx = newState.articles.findIndex(article => article.id === +action.payload.article_id);
      newState.articles[reviewidx].ratings.sum += action.payload.rating
      newState.articles[reviewidx].ratings.len += 1
      newState.currentArticle.ratings.push(action.payload)
      return newState
    case EDIT_RATING:
      newState = { ...state}
      const previewidx = newState.articles.findIndex(article => article.id === +action.payload.article_id);
      const Sreviewidx = newState.currentArticle.ratings.findIndex(rating => rating.id === +action.payload.id);
      newState.articles[previewidx].ratings.sum += action.payload.rating
      newState.articles[previewidx].ratings.sum -= action.oldRating
      newState.currentArticle.ratings[Sreviewidx] = action.payload
      return newState
    case ADD_COMMENT:
      newState = { ...state}
      newState.currentArticle.comments.push(action.payload)
      return newState
    case DELETE_COMMENT:
      newState = { ...state}
      console.log(action.payload)
      const delComIdx = newState.currentArticle.comments.findIndex(comment => comment.id === action.payload)
      console.log(delComIdx)
      newState.currentArticle.comments.splice(delComIdx, 1)
      return newState
    default:
      return state;
  }
}
