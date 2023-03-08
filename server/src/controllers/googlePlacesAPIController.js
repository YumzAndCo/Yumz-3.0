const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const createError = (errorInfo) => {
  const { method, type, error } = errorInfo;
  return {
    log: `googlePlacesAPIController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(error) : error}`,
    message: { err: `Error occured in googlePlacesAPIController.${method}. Check server logs for more details.`}
  };
};

const filterSearchResults = (searchResults) => {
  const { next_page_token, results } = searchResults;
  const filteredReturnResults = {
    nextPageToken: next_page_token,
  };

  // Filter and return results in the format of an object, where it's keys are the restaurant id #s
  filteredReturnResults.results = {};
  const undefinedValue = 'N/A';
  for (const restaurant of results) {
    filteredReturnResults.results[restaurant.place_id] = {};
    filteredReturnResults.results[restaurant.place_id].name = restaurant.name || undefinedValue;
    filteredReturnResults.results[restaurant.place_id].address = restaurant.formatted_address || undefinedValue;
    filteredReturnResults.results[restaurant.place_id].priceLevel = restaurant.price_level || undefinedValue;
  }

  return filteredReturnResults;
};

const googlePlacesAPIController = {};

googlePlacesAPIController.search = async (req, res, next) => { 
  try {
    console.log('In googlePlacesAPIController.findPlace');
    /* Geocoding testing
    const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=97209&key=${GOOGLE_PLACES_API_KEY}`);
    res.locals.geocode = await geocodeResponse.json();
    console.log('googlePlacesAPIController.findPlace; Geocode:', res.locals.geocode);
    */
    
    // const types = 'restaurant, bakery, meal_delivery, meal_takeaway, cafe';
    const types = 'restaurant';
    const { query, latitude, longitude, maxPrice } = req.query;
    const restaurantSearchResponse = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?' + new URLSearchParams({
      query,
      type: types,
      // lat, lng
      location: `${latitude}, ${longitude}`,
      maxprice: maxPrice,
      key: GOOGLE_PLACES_API_KEY,
    }));
    // const { input, inputtype } = req.query;
    // const restaurantSearchResponse = await fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?' + new URLSearchParams({
      //   input,
      //   inputtype,
      //   key: GOOGLE_PLACES_API_KEY
      // }));
    res.locals.restaurantSearchResults = filterSearchResults(await restaurantSearchResponse.json());
    // res.locals.restaurantSearchResults = await restaurantSearchResponse.json();
    return next();
  } catch (error) {
    return next(createError({
      method: 'restaurantSearch',
      type: ' ',
      error
    }));
  }
};

googlePlacesAPIController.getNextPage = async (req, res, next) => {
  try {
    console.log('In googlePlacesAPIController.getNextSearchPage');
    const { nextPageToken } = req.query;
    console.log(nextPageToken);
    const nextPageResponse = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?' + new URLSearchParams({
      pagetoken: nextPageToken,
      key: GOOGLE_PLACES_API_KEY
    }));
    res.locals.nextPageResults = filterSearchResults(await nextPageResponse.json());
    return next();
  } catch (error) {
    return next(createError({
      method: 'getNextSearchPage',
      type: ' ',
      error
    }));
  }
};

googlePlacesAPIController.getPlaceDetails = async (req, res, next) => {
  try {
    console.log('In googlePlacesAPIController.getPlaceDetails');
    const { placeID } = req.query || res.locals;
    const placeDetailsResponse = await fetch('https://maps.googleapis.com/maps/api/place/details/json?' + new URLSearchParams({
      place_id: placeID,
      key: GOOGLE_PLACES_API_KEY
    }));
    let placeDetailsResults = await placeDetailsResponse.json();
    placeDetailsResults = placeDetailsResults.result;

    /**
     * Bug: If placeDetails.Results.current_opening_hours is undefined then line 134 will throw an error
     * Fix: Ensure placeDetailsResults.current_opening_hours is not undefined
     */
    if (placeDetailsResults.current_opening_hours === undefined) {
      placeDetailsResults.current_opening_hours = {};
    }

    const sortedPlaceDetails = {
      id: placeDetailsResults.place_id,
      name: placeDetailsResults.name,
      address: placeDetailsResults.formatted_address,
      formattedPhoneNumber: placeDetailsResults.formatted_phone_number,
      status: placeDetailsResults.business_status,
      hours: placeDetailsResults.current_opening_hours.weekday_text,
      priceLevel: placeDetailsResults.price_level,
      rating: placeDetailsResults.rating,
      curbsidePickup: placeDetailsResults.curbside_pickup,
      delivery: placeDetailsResults.delivery,
      takeout: placeDetailsResults.takeout,
      dineIn: placeDetailsResults.dine_in,
      reservable: placeDetailsResults.reservable,
      servesBeer: placeDetailsResults.serves_beer,
      servesBreakfast: placeDetailsResults.serves_breakfast,
      servesBrunch: placeDetailsResults.serves_brunch,
      servesDinner: placeDetailsResults.serves_dinner,
      servesLunch: placeDetailsResults.serves_wine,
    };

    for (const [key, details] of Object.entries(sortedPlaceDetails)) {
      if (details === undefined) sortedPlaceDetails[key] = 'N/A';
    }

    // Testing for Yelp API
    // res.locals.placeDetailsResults = placeDetailsResults;
    res.locals.name = placeDetailsResults.name;
    res.locals.latitude = placeDetailsResults.geometry.location.lat;
    res.locals.longitude = placeDetailsResults.geometry.location.lng;

    res.locals.placeDetailsResults = sortedPlaceDetails;
    return next();
  } catch (error) {
    return next(createError({
      method: 'getPlaceDetails',
      type: ' ',
      error
    }));
  }
};

module.exports = googlePlacesAPIController;