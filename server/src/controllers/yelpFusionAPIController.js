const fetch = require('node-fetch');
const path = require('path');

const YELP_FUSION_API_KEY = process.env.YELP_FUSION_API_KEY;

const createError = (errorInfo) => {
  const { method, type, error } = errorInfo;
  return {
    log: `yelpFusionAPIController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(error) : error}`,
    message: { err: `Error occured in yelpFusionAPIController.${method}. Check server logs for more details.`}
  };
};

const yelpFusionAPIController = {};

yelpFusionAPIController.getRestaurantDetails = async (req, res, next) => {
  try {
    console.log('In yelpFusionAPIController.getRestaurantDetails');
    const { name, latitude, longitude } = res.locals;
  
    const restaurantDetailsResponse = await fetch('https://api.yelp.com/v3/businesses/search?' + new URLSearchParams({
      term: name,
      latitude,
      longitude
    }), {
      headers: {
        'Authorization': 'Bearer ' + YELP_FUSION_API_KEY,
        'accept': 'application/json'
      }
    });
    const restaurantDetailsResult = await restaurantDetailsResponse.json();
    console.log(restaurantDetailsResult);
    res.locals.restaurantDetailsResults = restaurantDetailsResult;
    return next();
  } catch (error) {
    return next(createError({
      method: 'getRestaurantDetails',
      type: ' ',
      error
    }));
  }
};

module.exports = yelpFusionAPIController;