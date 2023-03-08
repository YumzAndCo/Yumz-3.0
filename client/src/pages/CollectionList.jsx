import React, { Component, useState } from 'react';
import  '../stylesheets/listview.css';
import ListItem from '../components/ListItem.jsx';

export const CollectionList = (props) => {
  
  const [restaurants, setRestaurants] = useState(props.restaurants); //array
  const [listName, setListName] = useState(props.listName);

  return (
    <div className = "listview" >
      <div className = "collectionTitle">{listName}</div>
      {restaurants.map((listing) => ( //each restautant in array, return a listitem
        <ListItem listing={listing} key={listing.id}/>
      ))}
      
    </div>
    
  );
};
