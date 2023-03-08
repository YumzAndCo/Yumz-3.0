import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheets/detail.css';

const Detail = props => {

  if (Object.hasOwn(props, 'url')) {
    return (
      <div className="restaurant-detail">
        <a href={props.url} target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={props.iconName}
            className="details-modal-icon" />
          {props.text}
        </a>
      </div>
    );
  } else {
    return (
      <div className="restaurant-detail">
        <FontAwesomeIcon
          icon={props.iconName}
          className="details-modal-icon" />
        {props.text}
      </div>
    );
  }
};

export default Detail;
