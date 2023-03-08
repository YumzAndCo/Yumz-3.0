import React from 'react';
import styles from '../stylesheets/restaurant-search-result.css';

const RestaurantSearchResult = props => {
  return (
    <div
      className='restaurant-search-result'
      onClick={(event) => { props.onSearchResultClick(event, props); }}>
      <div className='search-result-name'>{props.name}</div>
      <div className='search-result-address'>{props.address}</div>
    </div>
  );
};

export default RestaurantSearchResult;