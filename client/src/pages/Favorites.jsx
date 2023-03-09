import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';
import { useNavigate } from 'react-router';

export const Favorites = () => {
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
      fetch('/api/favorites')
        .then(response => response.json())
        .then(data => {
          console.log('data is', data);
          setListItems(data.favorites);
          setRatingItem(data.ratings);
        });
    }
    fetchReviews();
  }, []);

  setTimeout(console.log('list state is', listItems), 3000);
  setTimeout(console.log('rating state is', ratingItem), 3000);

  if (listItems.length > 0){
    return (
      <CollectionList restaurants={listItems} ratings={ratingItem} listName="Favorites"/>
    );
  }
  else{
    return(
      <>
        <div className = 'wishlist-page'>
          <h1>Add restaurants to your favorites list!</h1>
        </div>
      </>
    );
  }

};