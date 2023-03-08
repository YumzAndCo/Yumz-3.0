import React, { Component, useState, useEffect } from 'react';
import { CollectionList } from './CollectionList.jsx';

export const Favorites = () => {

  const [listItems, setListItems] = useState({});

  useEffect(() => {
    async function fetchReviews() {
      return fetch('/favorites')
        .then(data => data.json())
        .then(data => setListItems(data));
    }
    fetchReviews();
  });
  return (
    <CollectionList listName="Favorites"/>
  );
};
