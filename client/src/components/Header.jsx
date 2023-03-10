import React from 'react';
import logo from '../../assets/images/LOGO2.gif';
import '../stylesheets/header.css';

const Header = props => {
  return (
    <div className='header'>
      <img id="logo" src={logo} />
    </div>
  );
};

export default Header;