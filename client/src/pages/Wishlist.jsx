import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';

export const Wishlist = () => {

  const [listItems, setListItems] = useState({});

  useEffect(() => {
    async function fetchReviews() {
      return fetch('/wishlist')
        .then(data => data.json())
        .then(data => setListItems(data));
    }
    fetchReviews();
  });
  return (
    <CollectionList listName="Wishlist"/>
  );
};

