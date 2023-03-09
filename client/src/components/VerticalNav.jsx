import React from 'react';
import VerticalNavItem from './VerticalNavItem.jsx';
import { faPlus, faFaceSmile, faBook, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/vertical-nav.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerticalNav = props => {

  const navigate = useNavigate();
  const onNavItemClick = (event, btnName) => {
    switch (btnName) {
    case 'add-restaurant':
      navigate('/new-restaurant');
      break;
    default:
      navigate('/');
    }
  };

  const logout = async () => {
    const response = fetch('/api/logout', {
      method: 'DELETE'
    });
    navigate('/');
  };



  return (
    <div id="vertical-nav">
      <button
        className="vertical-nav-btn"
        onClick={(e) => navigate('/profile')}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      <VerticalNavItem
        iconName={faPlus}
        btnName="add-restaurant"
        onClickHandler={(event) => onNavItemClick(event, 'add-restaurant')} />
      <button
        className="vertical-nav-btn"
        onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default VerticalNav;
