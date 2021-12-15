
import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import LoginModal from '../components/auth/LoginModal';
// import SearchForm from '../components/Searchbar';
import SignUpModal from './auth/SignUpModal';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);
  let navbuttons
  let articlebutton
  if (sessionUser) {
    articlebutton= " Publish Article"

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

  return (
    <div className="navbar">
      <NavLink to='/' exact={true} activeClassName='active'>
       {/* <img className="logo-img" src={""}/> */}
      </NavLink>
      {articlebutton}
      {/* <SearchForm/> */}
      {navbuttons}
    </div>
  );
}

export default NavBar;
