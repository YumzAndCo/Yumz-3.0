import React, { Component, useState } from 'react';
import  '../stylesheets/listview.css';
import ListItem from '../components/ListItem.jsx';
import { Navigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CollectionList = (props) => {
  const [goToHome, setGoToHome] = useState(false);
  
  const [restaurants, setRestaurants] = useState(props.restaurants); //array
  const [listName, setListName] = useState(props.listName);
  setTimeout(console.log('restaurant state is', restaurants), 3000);
  
  if (goToHome){
    return(
      <>
        <Navigate to = '/home' />
      </>
    );
  } 
  
  return (
    <>    
      <div className = "listview" >
        <div className = 'list-header'>
          <button id= "back-to-home"
            type="button"
            onClick = {() => setGoToHome(true)} ><FontAwesomeIcon icon={faArrowLeft} /></button>
          <div className = "collectionTitle">{listName}</div>
        </div>
        {restaurants.map((listing, index) => ( //each restautant in array, return a listitem
          <ListItem listing={listing} rating={props.ratings[index]} key={listing.id}/>
        ))}
      </div>
    </>
  );
};
