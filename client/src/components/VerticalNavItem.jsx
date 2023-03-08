import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerticalNavItem = props => {
  return (
    <button
      className="vertical-nav-btn"
      onClick={(event) => props.onClickHandler(event, props.btnName)}>
      <FontAwesomeIcon icon={props.iconName} />
    </button>
  );
};

export default VerticalNavItem;