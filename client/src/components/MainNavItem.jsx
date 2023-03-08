import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainNavItem = props => {

  return (
    <button
      id={props.btnId}
      className="main-nav-btn"
      onClick={(event) => props.onClickHandler(event, props.btnText)}>
      {props.btnText}<br />
      <FontAwesomeIcon
        icon={props.iconName}
        className="main-nav-icon" />
    </button>
  );
};

export default MainNavItem;