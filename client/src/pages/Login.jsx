import React, { useState, useEffect } from 'react';
import '../stylesheets/login.css';
import {useNavigate} from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => {
      if (res.status === 200) {
        return res;
      }
      else if (res.status === 300) {
        return false;
      }
    });

}

// This entire portion is used for react-router setup
export const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/session');
      if (response.ok) {
        return navigate('/home');
      }
      else {
        return;
      }
    }
    fetchSession();
  }, []);
  
  const handleSubmit = async e => {
    e.preventDefault();
    const signin = await loginUser({
      email,
      password
    });
    if (!signin) {
      return resetForm();
    }
    return navigate('/home');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    alert('Wrong user info!');
  };

  return (
    <div className="login">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} value = {email} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} value = {password} />
        </label>
        <div>
          <label>
            <button className="signupButton" type="button" onClick={e => navigate('/signup')}>No account yet?</button>
          </label>
        </div>
        <div>
          <button className="submit" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
