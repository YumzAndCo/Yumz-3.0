import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';

export const Favorites = () => {

  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    function fetchReviews() {
      fetch('/api/favorites')
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
      <CollectionList restaurants={listItems} listName="Favorites"/>
    );
  }
  else{
    return(
      <>
      </>
    );
  }

};