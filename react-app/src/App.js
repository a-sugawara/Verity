import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllArticles } from './store/articles';
import AllArticles from './components/AllArticles';
import ArticleForm from './components/ArticleForm'
import OneArticle from './components/OneArticle';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(getAllArticles())

  }, [dispatch]);

  let articles = useSelector(state => state.articles.articles)

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <Route path='/users' exact={true} >
          <UsersList/>
        </Route>
        <Route path='/home' exact={true}>
          <AllArticles articles={articles}/>
        </Route>
        <Route path='/' exact={true} >
          <AllArticles articles={articles}/>
        </Route>
        <Route path='/articles/:id' exact={true} >
          <OneArticle/>
        </Route>
        <Route path='/declare' exact={true} >
          <ArticleForm/>
        </Route>
        <ProtectedRoute path='/declare' exact={true} >
          form
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
