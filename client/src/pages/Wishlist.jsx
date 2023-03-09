import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';
import { useNavigate } from 'react-router';

export const Wishlist = () => {
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const [ratingItem, setRatingItem] = useState([]);

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/session');
      if (response.ok){
        return;
      }
      else{
        return navigate('/');
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    function fetchReviews() {
      fetch('/api/wishlist')
        .then(response => response.json())
        .then(data => {
          console.log('front end data is:', data);
          setListItems(data.wishlist);
          setRatingItem(data.ratings);
          // console.log('list state is', listItems);
        });
    }
    fetchReviews();
  }, []);

  setTimeout(console.log('list state is', listItems), 3000);

  if (listItems.length > 0){
    return (
      <CollectionList restaurants={listItems} ratings={ratingItem} listName="Wishlist"/>
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

