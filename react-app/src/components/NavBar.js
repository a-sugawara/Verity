
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import LoginModal from '../components/auth/LoginModal';
// import SearchForm from '../components/Searchbar';
import SignUpModal from './auth/SignUpModal';

const NavBar = () => {

  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  let navbuttons
  let articlebutton
  if (sessionUser) {
    articlebutton= <NavLink to = "/declare">
        <div className="navbtn">
          Declare
        </div>
      </NavLink>
    navbuttons =<div>
     <LogoutButton />
      </div>
  }else {
    articlebutton=null
    navbuttons =<div className="navbtn-holder">
        <LoginModal/>
        <SignUpModal/>
    </div>
  }

  const toHome = () => {
    history.push('/')
  }

  return (
    <div className="navbar">

       <img
        onClick={()=> toHome()}
        className="logo-img" src={"https://cdn.discordapp.com/attachments/920285009099751524/920786815022149652/logov1.png"}/>

      {articlebutton}
      <div></div>
      {/* <SearchForm/> */}
      {navbuttons}
    </div>
  );
}

export default NavBar;
