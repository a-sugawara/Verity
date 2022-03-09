import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./forms.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bool, setBool] = useState(false)
  const [ebool, seteBool] = useState(false)
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    setBool(true)
  }, [])


  const onSignUp = async (e) => {
    e.preventDefault();
    let errs = []
    if (username.length <3){
      errs.push('Username must be at least 3 characters')
    }
    if (username.length >30){
      errs.push('Username cannont exceed 30 characters')
    }
    if(!/(@)/gi.test(email)){

      errs.push('Please enter a valid email address')
    }
    if(errs.length){
      seteBool(true)
      setErrors(errs)
      return
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        seteBool(true)
        setErrors(data)
      }
    }else{
      seteBool(true)
      setErrors(["Passwords must match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form
      className={`form sign-form sign-form-${bool}`}>

        <div className={`errors errors-${ebool}`}>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}</div>
        <div className="form-title">
          Sign Up
        </div>

        <input
          placeholder='User Name'
          type='text'
          name='username'
          onChange={updateUsername}
          className="input"
          value={username}
          required
          ></input>


        <input
          placeholder='Email'
          type='email'
          name='email'
          onChange={updateEmail}
          className="input"
          value={email}
          required
          ></input>


        <input
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className="input"
          required
          ></input>


        <input
          placeholder='Repeat Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className="input"
          ></input>

      <div className="modalbtn" onClick={onSignUp}>Sign Up</div>
    </form>
  );
};

export default SignUpForm;
