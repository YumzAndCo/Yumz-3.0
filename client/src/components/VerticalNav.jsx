import React from 'react';
import VerticalNavItem from './VerticalNavItem.jsx';
import { faPlus, faFaceSmile, faBook } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/vertical-nav.css';
import { useNavigate } from 'react-router-dom';

const VerticalNav = props => {

  const navigate = useNavigate();
  const onNavItemClick = (event, btnName) => {
    switch (btnName) {
    case 'add-restaurant':
      navigate('/new-restaurant');
      break;
    default:
      navigate('/login');
    }
  };

  return (
    <div id="vertical-nav">
      <VerticalNavItem
        iconName={faFaceSmile}
        btnName="user"
        onClickHandler={(e) => navigate('/login')} />
      <VerticalNavItem
        iconName={faPlus}
        btnName="add-restaurant"
        onClickHandler={(event) => onNavItemClick(event, 'add-restaurant')} />
      {/* <VerticalNavItem
        iconName={faBook}
        btnName="user"
        onClickHandler={onNavItemClick} /> */}
    </div>
  );
};

export default VerticalNav;
