import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';

export const Wishlist = () => {

  const [listItems, setListItems] = useState([{
    name: 'Ramen House',
    rating: 8,
    cuisine: 'Japanese',
    hours: '11 am - 8 pm, 7 days/wk',
    preview: 'Lorem ipsum...',
    id: 1
  },
  {
    name: 'Ramen place',
    rating: 8,
    cuisine: 'Japanese',
    hours: '11 am - 8 pm, 7 days/wk',
    preview: 'Lorem ipsum...',
    id: 2
  }]);

  // useEffect(() => {
  //   async function fetchReviews() {
  //     return fetch('/wishlist')
  //       .then(data => data.json())
  //       .then(data => setListItems(data));
  //   }
  //   fetchReviews();
  // });
  return (
    <CollectionList restaurants = {listItems} listName="Wishlist"/>
  );
};

