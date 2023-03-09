import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';
import {useNavigate} from 'react-router-dom';

export const Reviews = () => {
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
      fetch('/api/reviews')
        .then(response => response.json())
        .then(data => {
          console.log('front end data is:', data);
          setListItems(data.reviews);
          setRatingItem(data.ratings);
          // console.log('list state is', listItems);
        });
    }
    fetchReviews();
  }, []);

  setTimeout(console.log('list state is', listItems), 3000);
  setTimeout(console.log('rating state is', ratingItem), 3000);
  
  if (listItems.length > 0){
    return (
      <CollectionList restaurants={listItems} ratings={ratingItem} listName="Reviews"/>
    );
  }
  else{
    return(
      <>
        <div className = 'wishlist-page'>
          <h1>Add restaurants to your reviews list!</h1>
        </div>
      </>
    );
  }
};

