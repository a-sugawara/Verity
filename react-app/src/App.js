import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllArticles } from './store/articles';
import AllArticles from './components/AllArticles';
import ArticleForm from './components/ArticleForm'
import OneArticle from './components/OneArticle';
import Splash from './components/Splash'
import Japan from './components/Splash/japan'
import Example from './components/Splash/Example'
import Animation2 from './components/Splash/Animation2';
import CallToAction from './components/Splash/CallToAction';
import AllArticlesList from './components/AllArticlesList'
import SearchedArticles from './components/SearchedArticles'
import Footer from './components/Footer';
import AboutMe from './components/AboutMe'

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

      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <Route path='/users' exact={true} >
        <NavBar />
          <UsersList/>
        </Route>
        <Route path='/all' exact={true} >
        <NavBar />
          <AllArticlesList/>
        </Route>
        <Route path='/users' exact={true} >
        <NavBar />
          <UsersList/>
        </Route>
        <Route path='/home' exact={true}>
        <NavBar />
          <AllArticles articles={articles}/>
        </Route>
        <Route path='/discover/:term' exact={true}>
        <NavBar />
        <SearchedArticles/>
        </Route>
        <Route path='/' exact={true} >
          <Splash/>
          <Japan/>
          <Animation2/>
          <div className="white-bar"></div>
          <Example />
          <CallToAction/>
        </Route>
        <Route path='/articles/:id' exact={true} >
        <NavBar />
          <OneArticle/>
        </Route>
        <Route path='/declare' exact={true} >
        <NavBar />
          <ArticleForm/>
        </Route>
        <Route path='/aboutme' exact={true} >
          <NavBar />
          <AboutMe/>
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
