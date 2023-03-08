const { query } = require('express');
const db = require('../models/userModels.js');

// const createError = (errorInfo) => {
//   const {method, type, error} = errorInfo;
//   return {
//     log: `userController.${method} ${type}: ERROR: ${typeof error === 'object' ? JSON.stringify(error):error}`,
//     message: {err: `error occurreed in userController.${method}. Check server logs for more details.`}
//   };
// };

const collectionsController = {};

collectionsController.getReviews = async (req, res, next) => {
  try {
    const {userID} = req.body;
    const userReviews = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'reviews'`);
  } catch(error) {
    return next({
      log: 'an error occurred',
      message: 'an error occurred'
    });
  }
};

collectionsController.getFavorites = async (req, res, next) => {
  try {
    const {userID} = req.body;
    const userFavorites = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'favorites'`);
  } catch(error) {
    return next({
      log: 'an error occurred',
      message: 'an error occurred'
    });
  }
};

collectionsController.getWishlist = async (req, res, next) => {
  try {
    const {userID} = req.body;
    const userWishlist = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'wishlist'`);

  } catch(error) {
    return next({
      log: 'an error occurred',
      message: 'an error occurred'
    });
  }
};

collectionsController.addToFavorites = async (req, res, next) => {
  const collectionID = req.body.collection_id;
  const restaurantID = res.locals.restID;
  await db.query(
    `INSERT INTO collection_restaurant (collection_id, restaurant_id) 
    VALUES ('${collectionID}', '${restaurantID}')`
  );
  return next();
};

collectionsController.addToWishlist = async (req, res, next) => {
  const collectionID = req.body.collection_id;
  const restaurantID = res.locals.restID;
  await db.query(
    `INSERT INTO collection_restaurant (collection_id, restaurant_id) 
    VALUES ('${collectionID}', '${restaurantID}')`
  );
  return next();
};

collectionsController.addToReviews = async (req, res, next) => {
  
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