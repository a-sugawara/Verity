// constants
const SET_ARTICLES = 'session/SET_ARTICLES';
const REMOVE_USER = 'session/REMOVE_USER';

const setArticles = (payload) => ({
  type: SET_ARTICLES,
  payload
});


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

const initialState = { articles:null, currentArticle:null}

export default function reducer(state = initialState, action) {
    let newState
  switch (action.type) {
    case SET_ARTICLES:
        newState = {...state}
        return { ...newState, ...action.payload }
    default:
      return state;
  }
}
