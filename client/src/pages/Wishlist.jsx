import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';

export const Wishlist = () => {

  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    function fetchReviews() {
      fetch('/api/wishlist')
        .then(response => response.json())
        .then(data => {
          console.log('front end data is:', data);
          setListItems(data);
          // console.log('list state is', listItems);
        });
    }
    fetchReviews();
  }, []);

  setTimeout(console.log('list state is', listItems), 3000);
  if (listItems.length > 0){
    return (
      <CollectionList restaurants={listItems} listName="Wishlist"/>
    );
  }
  else{
    return(
      <>
        <div className = 'wishlist-page'>
          <h1>Add restaurants to your wishlist!</h1>
        </div>
      </>
    );
  }

};

