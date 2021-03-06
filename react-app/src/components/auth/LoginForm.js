import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./forms.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bool, setBool] = useState(false)
  const [ebool, seteBool] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setBool(true)
  }, [])

  const demoLogin = async() => {
    await dispatch(login('demo@aa.io', 'password'));

}

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      seteBool(true)
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form
      className={`form login-form login-form-${bool}`}
      >


            <div className={`errors errors-${ebool}`}>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            </div>
        <div className="form-title">
          Login
        </div>

        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          required
          className="input"
          onChange={updateEmail}
          />


        <input
          name='password'
          type='password'
          required
          placeholder='Password'
          value={password}
          className="input "
          onChange={updatePassword}
        />
        <div className="modalbtn" onClick={onLogin}>Login</div>

      <div className="modalbtn" onClick={demoLogin}>Demo Login</div>
    </form>

  );
};

export default LoginForm;
