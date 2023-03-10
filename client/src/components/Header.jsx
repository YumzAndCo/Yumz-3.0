import React from 'react';
import logo from '../../assets/images/LOGO2.png';
import '../stylesheets/header.css';

const Header = props => {
  return (
    <div className='header'>
      <img src={logo} />
    </div>
  );
};

export default Header;