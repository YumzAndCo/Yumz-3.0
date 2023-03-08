import React, { useState } from 'react';
import RestaurantInfo from '../components/RestaurantInfo.jsx';
import RestaurantSearchResult from '../components/RestaurantSearchResult.jsx';
import RatingsTable from '../components/RatingsTable.jsx';
import '../stylesheets/new-restaurant.css';
import '../stylesheets/details-modal.css';
import RatingNotes from '../components/RatingNotes.jsx';
import helperFns from '../helperFns.js';
import { useNavigate } from 'react-router-dom';

const NewRestaurant = props => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [searchResults, setSearchResults] = useState({});

  const navigate = useNavigate();

  const submitRestaurantName = async (event) => {
    try {
      event.preventDefault();
      console.log(event.currentTarget);
      const nameInput = document.querySelector('#restaurant-name-input');
      const restaurantName = nameInput.value;
      if (!restaurantName.length) {
        // This could be handled better... but no time :(
        alert('Please enter a restaurant name');
        return;
      }

      const locationInput = document.querySelector('#restaurant-location-input');
      const locationVal = locationInput.value;

      let requestUrl = `/api/search?query=${restaurantName}`;

      // - Modify the URL based on what the user input for the location
      // - If they selected Current Location, try using the user's geolocation coordinates
      // - Otherwise for a non-empty string value, append it to the query param
      // - For an empty string, Google Places API will default to user's location (based on IP address of req?)
      if (locationVal === 'Current Location') {
        const userCoords = helperFns.retrieveUserCoords();
        const latitude = Object.hasOwn(userCoords, 'latitude') ? userCoords.latitude : null;
        const longitude = Object.hasOwn(userCoords, 'longitude') ? userCoords.longitude : null;

        if (latitude && longitude) {
          requestUrl += `&latitude=${latitude}&longitude=${longitude}`;
        }
      } else if (locationVal.length) {
        requestUrl += ` near ${locationVal}`;
      }
      // TODO - not handling scenario where no search results come back..
      console.log('submitRestaurantName, searching for restaurant name:', restaurantName,
        'location val: ', locationVal);

      console.log('NewRestaurant sending request to ', requestUrl);
      const response = await fetch(requestUrl);
      const jsonSearchResults = await response.json();

      const newSearchResults = {};
      for (const [googlePlaceId, googlePlaceInfo] of Object.entries(jsonSearchResults.results)) {
        newSearchResults[googlePlaceId] = {
          'name': googlePlaceInfo.name,
          'address': googlePlaceInfo.address
        };
      }

      setSearchResults(newSearchResults);
    } catch (error) {
      // This should be better error handling..
      console.log('NewRestaurant submitRestaurantName error', error.message);
    }
  };

  const onSearchResultClick = async (event, selectedRestaurant) => {
    console.log(selectedRestaurant);
    try {
      const googlePlaceId = selectedRestaurant.googlePlaceId;
      const requestUrl = `/api/place-details?placeID=${googlePlaceId}`;

      const response = await fetch(requestUrl);
      const restaurantDetails = await response.json();

      // Note: Google Places API doesn't provide all of the details, so hardcoding for now
      // Yelp API should provide remaining details
      const newRestaurantInfo = await {};
      newRestaurantInfo['googlePlaceId'] = restaurantDetails.id;
      newRestaurantInfo['name'] = restaurantDetails.name;
      newRestaurantInfo['address'] = restaurantDetails.address;
      newRestaurantInfo['category'] = 'American (Traditional), Pizza, Pasta Shops';
      newRestaurantInfo['parking'] = 'Private lot parking';
      newRestaurantInfo['hours'] = restaurantDetails.hours;
      newRestaurantInfo['menu'] = 'https://www.google.com';
      newRestaurantInfo['dress-code'] = 'Casual';
      newRestaurantInfo['reservations'] = restaurantDetails.reservable;
      newRestaurantInfo['delivery'] = restaurantDetails.takeout;
      newRestaurantInfo['credit-cards'] = true;

      setSearchResults({});
      setRestaurantInfo(newRestaurantInfo);
    } catch (error) {
      // This should be better error handling..
      console.log('NewRestaurant onSearchResultClick error', error.message);
    }
  };

  const onFinishBtnClick = () => {
    console.log('Finish button clicked');
    // TO DO - post request to /restaurant
  };

  const onReturnSearchBtnClick = () => {
    setSearchResults({});
  };

  const onReturnHomeBtnClick = () => {
    navigate('/');
  };

  const searchResultItems = [];
  for (const [googlePlaceId, googlePlaceInfo] of Object.entries(searchResults)) {
    searchResultItems.push(
      <RestaurantSearchResult
        name={googlePlaceInfo.name}
        address={googlePlaceInfo.address}
        googlePlaceId={googlePlaceId}
        onSearchResultClick={onSearchResultClick}
        key={googlePlaceId}
      />
    );
  }

  if (searchResultItems.length > 0) {
    // VIEW SEARCH RESULTS
    return (
      <div id='new-restaurant-info'>
        <div id='new-restaurant-header'>Search Results</div>
        <button
          className='new-restaurant-button'
          onClick={onReturnSearchBtnClick}>
          Return to Search
        </button>
        {searchResultItems}
        {/* Skipping next button functionality for now..
        <button id='next-button'>Next</button> */}
      </div>
    );
  } else if (restaurantInfo === null) {
    // SEARCH FOR A RESTAURANT
    return (
      <div id='new-restaurant-info'>
        <div id='new-restaurant-header'>Add a Restaurant</div>
        <div className='new-restaurant-prompt'>What is the name of the restaurant?</div>
        <form
          onSubmit={(event) => submitRestaurantName(event)}
          autoComplete='off'>
          <input
            id='restaurant-name-input'
            name='restaurant-name-input'
            className='new-restaurant-input'
            type='text' /><br />
          <label className='new-restaurant-prompt'
            htmlFor='restaurant-location-input'>
            Add a location to search in?
          </label><br />
          <input
            id='restaurant-location-input'
            name='restaurant-location-input'
            className='new-restaurant-input'
            type='text'
            list='location-options' />
          <datalist id='location-options'>
            <option value='Current Location' />
          </datalist>
          <br />
          <button id='return-home-btn'
            type='button'
            className='new-restaurant-button'
            onClick={onReturnHomeBtnClick}>Return Home</button>
          <input type='submit'
            value='Next'
            className='new-restaurant-button'></input>
        </form>
      </div>
    );
  } else {
    // VIEW RESTAURANT DETAILS
    return (
      <div id='new-restaurant-info'>
        <div id="restaurant-name">{restaurantInfo.name}</div>
        <RestaurantInfo info={restaurantInfo} />
        <div className="section-header">
          <span>Ratings</span>
        </div>
        <RatingsTable />
        <div className="section-header">
          <span>Notes</span>
        </div>
        <RatingNotes
          buttonText='Finish'
          clickHandler={onFinishBtnClick} />
      </div>
    );
  }
};

export default NewRestaurant;