// constants
const SET_ARTICLES = 'article/SET_ARTICLES';
const SET_ONE_ARTICLE = 'article/SET_ONE_ARTICLE';
const ADD_ARTICLE = 'article/ADD_ARTICLE';
const EDIT_ARTICLE = 'article/EDIT_ARTICLE';
const DELETE_ARTICLE = 'article/DELETE_ARTICLE';
const ADD_RATING = 'rating/ADD_RATING';

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
const addNewRating = (payload) => ({
  type:ADD_RATING,
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
  console.log(rating)
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

const initialState = { articles:null, currentArticle:null}

export default function reducer(state = initialState, action) {
    let newState
  switch (action.type) {
    case SET_ARTICLES:
        newState = {...state}
        return { ...newState, ...action.payload }
    case SET_ONE_ARTICLE:
      newState = { ...state, currentArticle: action.payload }
      return newState
    case ADD_ARTICLE:
      newState = { ...state}
      newState.articles.push(action.payload)
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
      console.log(articleDelidx,action.payload)
      newState.articles = newState.articles.splice(articleDelidx, 1)
      newState.articles = newState.articles.slice()
      newState.currentArticle = null
      return newState
    case ADD_RATING:
      newState = { ...state}
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",action.payload)
      const reviewidx = newState.articles.findIndex(article => article.id === +action.payload.article_id);
      newState.articles[reviewidx].ratings.sum += action.payload.rating
      newState.articles[reviewidx].ratings.len += 1
      newState.currentArticle.ratings.push(action.payload)

      return newState
    default:
      return state;
  }
}
