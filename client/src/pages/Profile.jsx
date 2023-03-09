import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheets/profilePage.css';

const Profile = () => {
  const [goToHome, setGoToHome] = useState(false);
  const [userData, setUserData] = useState(null);
  const [favoritesData, setFavoritesData] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [bg, setBg] = useState('https://i.stack.imgur.com/34AD2.jpg');
  
  const goHome = () => {
    return setGoToHome(true);
  };

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/session');
      if (response.ok) {
        return;
      }
      else {
        return setGoToHome(true);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    async function getUserDetails(){
      const response = await fetch('/api/user');
      const data = await response.json();
      //   console.log('data is', data);
      if (response.status === 200){
        setUserData(data.profile[0]);
        if (data.profile[0].profile_picture) setBg(data.profile[0].profile_picture);
        if (data.favorites.length > 1) data.favorites.sort((a,b) => b.overall_score - a.overall_score);
        if (data.favorites.length > 3) setFavoritesData(data.favorites.slice(0, 3));
        else {
          setFavoritesData(data.favorites);
        }
      }
    }
    getUserDetails();
  }, []);

  const submitProfilePic = (url) => {
    fetch('/api/profilePic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url)
    });
  };
  
  const submitBio = (bio) => {
    fetch('/api/userbio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bio)
    });
  };
  
  if (goToHome){
    return(
      <>
        <Navigate to = '/home' />
      </>
    );
  }

//   console.log('userData is:', userData);
//   console.log('favoritesData is', favoritesData);

  return(
    <div className = 'profile-page'>
      <button id= "back-to-home"
        type="button"
        onClick = {() => setGoToHome(true)} ><FontAwesomeIcon icon={faArrowLeft} /></button>
      <div className = 'profile-background'>
        {userData && <h1>Welcome {userData.name}</h1>}
        <div id = 'profile-picture' style = {{backgroundImage: `url(${bg})`}}>
            
        </div>
        <div className = 'profile-pic-submit'>
          <input placeholder = 'Paste Profile Picture URL'
            value = {profilePic}
            onChange = {(e) => setProfilePic(e.target.value)}/>
          <button onClick = {submitProfilePic}> Submit </button>
        </div>
        <textArea id="bio"
          value = {bio} 
          onChange = {(e) => setBio(e.target.value)}/>
        <button id='bio-submit' onClick = {submitBio}> Submit </button>
        <h2>Favorite Restaurants</h2>
        <div id = 'top-favorites'>
          {favoritesData && favoritesData.map((favorite) => (
            <div className="preview" key={favorite.id}>
              <span className = "item" id="name">{favorite.name}</span> 
              <span className = "item" id="stars">{favorite.overall_score} ☆</span>
              <span className = "item" id="cuisine">{favorite.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;