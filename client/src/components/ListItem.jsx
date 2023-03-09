import React, { Component, useState } from 'react';
import DetailsModal from './DetailsModal.jsx';

const ListItem = (props) => {

  const [modalStatus, setModalStatus] = useState(false);
  const openModal = (e) => {
    return <DetailsModal show={modalStatus} close={() => setModalStatus(false)} />;
  };
  
  return (

    <div className="preview">
      <span className = "item" id="name">{props.listing.name}</span> 
      <span className = "item" id="stars">{props.rating.overall_score} ☆</span>
      <span className = "item" id="cuisine">{props.listing.cuisine}</span>
      <span className = "item" id="more-info" onClick={()=> setModalStatus(true)}>More Info</span>
      <DetailsModal show={modalStatus} restaurant = {props.listing}
        rating = {props.rating} close={() => setModalStatus(false)} />
    </div>

  );
};

export default ListItem;