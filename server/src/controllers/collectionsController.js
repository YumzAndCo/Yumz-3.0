const { query } = require('express');
const db = require('../models/userModels.js');

const createError = (errorInfo) => {
  const {method, type, error} = errorInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
    message: {err: `error occurreed in userController.${method}. Check server logs for more details.`}
  };
};

const collectionsController = {};

collectionsController.getReviews = async (req, res, next) => {
  try {
    const userID = req.cookies.ssid;
    const collectionId = req.cookies.reviews;
    const userReviews = await db.query(`SELECT * FROM collection_restaurant 
    INNER JOIN restaurants 
    ON collection_restaurant.restaurant_id = restaurants.restaurant_id
    WHERE collection_restaurant.collection_id = ${collectionId};`);

    res.locals.reviews = userReviews.rows;
    console.log('res.locals.reviews:', res.locals.reviews);
    return next();
  } 
  catch(error) {
    return next({
      log: `an error occurred in getReviews. ${error}`,
      message: 'an error occurred in getReviews',
      error
    });
  }
};

collectionsController.getFavorites = async (req, res, next) => {
  try {
    const userID = req.cookies.ssid;
    const collectionId = req.cookies.favorites;
    const userFavorites = await db.query(`SELECT * FROM collection_restaurant 
    INNER JOIN restaurants 
    ON collection_restaurant.restaurant_id = restaurants.restaurant_id
    WHERE collection_restaurant.collection_id = ${collectionId};`);

    res.locals.favorites = userFavorites.rows;
    console.log('res.locals.favorites:', res.locals.favorites);
    return next();
  } 
  catch(error) {
    return next({
      log: `an error occurred in getFavorites, ${error}`,
      message: 'an error occurred in getFavorites',
      error
    });
  }
};

collectionsController.getFavoritesRatings = async (req, res, next) => {
  try {
    const userID = req.cookies.ssid;
    const collectionId = req.cookies.favorites;
    const userFavorites = await db.query(`SELECT * FROM collection_restaurant 
    INNER JOIN restaurants 
    ON collection_restaurant.restaurant_id = restaurants.restaurant_id
    INNER JOIN ratings
    ON ratings.restaurant_id = collection_restaurant.restaurant_id
    WHERE collection_restaurant.collection_id = ${collectionId};`);

    res.locals.favorites = userFavorites.rows;
    console.log('res.locals.favorites:', res.locals.favorites);
    return next();
  } 
  catch(error) {
    return next({
      log: `an error occurred in getFavorites, ${error}`,
      message: 'an error occurred in getFavorites',
      error
    });
  }
};

collectionsController.getWishlist = async (req, res, next) => {
  try {
    const userID = req.cookies.ssid;
    const collectionId = req.cookies.wishlist;
    const userWishlist = await db.query(`SELECT * FROM collection_restaurant 
    INNER JOIN restaurants 
    ON collection_restaurant.restaurant_id = restaurants.restaurant_id
    WHERE collection_restaurant.collection_id = ${collectionId};`);

    res.locals.wishlist = userWishlist.rows;
    console.log('res.locals.wishlist:', res.locals.wishlist);
    return next();

  } 
  catch(error) {
    return next({
      log: `an error occurred in getWishlist, ${error}`,
      message: 'an error occurred in getWishlist',
      error
    });
  }
};

collectionsController.addToFavorites = async (req, res, next) => {
  try {
    const collectionID = req.cookies.favorites;
    const restaurantID = res.locals.restID;
    // const restaurantName = res.locals.restName;
    const newFavoritesItem = await db.query(
      `INSERT INTO collection_restaurant (collection_id, restaurant_id) 
      VALUES ('${collectionID}', '${restaurantID}')
      RETURNING *;`
    );
    res.locals.newFavoritesItem = newFavoritesItem;
    return next();
  }

  catch(error){
    return next(createError({
      log: `error in addToFavorites, ${error}`,
      message: 'error in addToFavorites',
      error
    }));
  }
};

collectionsController.addToWishlist = async (req, res, next) => {
  try {
    const collectionID = req.cookies.wishlist;
    const restaurantID = res.locals.restID;
    // const restaurantName = res.locals.restName;
    const newWishlistItem = await db.query(
      `INSERT INTO collection_restaurant (collection_id, restaurant_id) 
      VALUES ('${collectionID}', '${restaurantID}')
      RETURNING *;`
    );
    res.locals.newWishlistItem = newWishlistItem;
    return next();
  } 
  catch(error){
    return next(createError({
      log: `error in addToWishList, ${error}`,
      message: 'error in addToWishList',
      error
    }));
  }
};

collectionsController.addToReviews = async (req, res, next) => {
  try {
    const collectionID = req.cookies.reviews;
    const restaurantID = res.locals.restID;
    // const restaurantName = res.locals.restName;
    const newReviewItem = await db.query(
      `INSERT INTO collection_restaurant (collection_id, restaurant_id) 
      VALUES ('${collectionID}', '${restaurantID}')
      RETURNING *;`
    );
    res.locals.newReviewItem = newReviewItem;
    return next();
  } 
  catch(error){
    return next(createError({
      log: `error in addToReviews, ${error}`,
      message: 'error in addToReviews',
      error
    }));
  }
};

/*

const body = {
      "user_id": 1,
      "collection_id": 99,
      "restaurant": {
        "restaurant_id": 1234,
        "name": "some restaurant name",
        "address": "123 Something St"
        ....
      },
      "rating": {
        "rating_id": 5678,
        "overall_score": 8,
        "food_score": 3,
        ...
      }
    };

*/ 

module.exports = collectionsController;