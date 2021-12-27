
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import LoginModal from '../components/auth/LoginModal';
// import SearchForm from '../components/Searchbar';
import SignUpModal from './auth/SignUpModal';

const NavBar = () => {
  const [term, setTerm] = useState('');
  const [bool, setBool] = useState(false)
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  let navbuttons

  useEffect(() => {
    if(term.length > 0)history.push(`/discover/${term}`)
},[term])

  if (sessionUser) {

    navbuttons =<div className="navbtn-holder">
     <LogoutButton />
      </div>
  }else {
    navbuttons =<div className="navbtn-holder">
        <LoginModal/>
        <SignUpModal/>
    </div>
  }

  const toHome = () => {
    history.push('/home')
  }

  return (
    <div className="navbar">
      <img
        onClick={()=> toHome()}
        className="logo-img" src={"https://cdn.discordapp.com/attachments/920285009099751524/920786815022149652/logov1.png"}/>
      <div className={`searchbar searchbar-${bool}`}>
        <input
          value={term}
          onChange= {(e) => setTerm(e.target.value)}
          placeholder="Search"
          className="searchform"/>
      </div>
      <div></div>
      {/* <SearchForm/> */}
      <div className="btnholder">
        <img
          onClick={()=>setBool(!bool)}
          className="searchbtn"
          src="https://cdn.discordapp.com/attachments/920285009099751524/925077820693176340/searchwhite.png"/>
        {navbuttons}
      </div>
    </div>
  );
}

export default NavBar;
