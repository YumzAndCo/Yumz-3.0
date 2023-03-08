import React, { useState} from 'react';
import '../stylesheets/login.css';
import {useNavigate} from 'react-router-dom';

async function signupUser(credentials) {
  return fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
    
}

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  

  const handleSubmit = async e => {
    e.preventDefault();
    await signupUser({
      name,
      email,
      password
    });
    navigate('/home');
  };

  return(
    <div className="signup">
      <h1>Sign up here</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="submit" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};