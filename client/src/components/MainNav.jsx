import React from 'react';
import MainNavItem from './MainNavItem.jsx';
import { faBurger, faMugHot, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../stylesheets/main-nav.css';
import { useNavigate } from 'react-router-dom';

const MainNav = props => {
  const navigate = useNavigate();

  // const onMainNavBtnClick = (event, btnName) => {
  //   console.log(btnName, 'clicked!');
  //   navigate('/collection');
  // };

  // Note: if we add the feature to allow users to create custom collections,
  // then MainNavItem components can be generated on the results of a GET for a user's
  // collections
  return (
    <div id="main-nav">
      <MainNavItem
        iconName={faBurger}
        btnId="main-nav-reviews"
        btnText="Reviews"
        onClickHandler={(e) => navigate('/reviews')} />
      <MainNavItem
        iconName={faMugHot}
        btnId="main-nav-wishlist"
        btnText="Wishlist"
        onClickHandler={(e) => navigate('/wishlist')} />
      <MainNavItem
        iconName={faHeart}
        btnId="main-nav-favorites"
        btnText="Favorites"
        onClickHandler={(e) => navigate('/favorites')} />
    </div>
  );
};

export default MainNav;