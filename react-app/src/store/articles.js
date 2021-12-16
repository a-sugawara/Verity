// constants
const SET_ARTICLES = 'article/SET_ARTICLES';
const SET_ONE_ARTICLE = 'article/SET_ONE_ARTICLE';
const ADD_ARTICLE = 'article/ADD_ARTICLE';
const EDIT_ARTICLE = 'article/EDIT_ARTICLE';

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
    default:
      return state;
  }
}
