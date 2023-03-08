import React, {useState, useEffect} from 'react';
import VerticalNav from '../components/VerticalNav.jsx';
import MainNav from '../components/MainNav.jsx';
import Header from '../components/Header.jsx';
import '../stylesheets/landing.css';
import {useNavigate} from 'react-router-dom';



const Landing = props => {
  // const [goToLogin, setGoToLogin] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/login');
    
  // });
  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/session');
      if (response.ok){
        return;
      }
      else{
        return navigate('/');
      }
    }
    fetchSession();
  }, []);

  return (
    <div id='landing'>
      <VerticalNav />
      <Header />
      <MainNav />
    </div>
  );
};

export default Landing;