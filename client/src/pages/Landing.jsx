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
  const yumAudio = {
    1: '../../assets/yum_audio/Yum-3.mp3',
    2: '../../assets/yum_audio/Yum-4.mp3',
    3: '../../assets/yum_audio/Yum-5.mp3',
    4: '../../assets/yum_audio/Yum-6.mp3',
    5: '../../assets/yum_audio/Yum-7.mp3',
    6: '../../assets/yum_audio/Yum-8.mp3',
    7: '../../assets/yum_audio/Yum-9.mp3',
    8: '../../assets/yum_audio/Yum-10.mp3'
  };
  const sayRandomYum = ()=>{
    const yumAudioNumber = Math.floor(Math.random() * 8 + 1);
    const yumPath = yumAudio[yumAudioNumber];
    const myAudio = new Audio(yumPath);
    myAudio.play();
  };
  // });
  useEffect(() => {
    sayRandomYum();
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