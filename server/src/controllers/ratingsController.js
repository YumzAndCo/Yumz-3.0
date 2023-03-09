const { query } = require('express');
const db = require('../models/userModels.js');

const createError = (errorInfo) => {
  const {method, type, error} = errorInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
    message: {err: `error occurreed in userController.${method}. Check server logs for more details.`}
  };
};

const ratingsController = {};

ratingsController.addRating = async (req, res, next) => {
  try {
    const userId = req.cookies.ssid;
    console.log('userID', userId);
    const restaurantID = res.locals.restID;
    console.log('restaurantID', restaurantID);
    //res.locals.restID
    
    const date = new Date.now();
    // console.log('req.body:', req.body);

    const { overall_score, notes } = req.body;
    console.log('ratings data:', overall_score + ' ' + notes);

    const newRating = await  db.query(
      `INSERT INTO ratings (user_id, restaurant_id, date_last_updated, overall_score, notes) 
        VALUES ('${userId}', '${restaurantID}', ${date}, ${overall_score}, ${notes})
        RETURNING *;`
    );
    console.log('new rating is:', newRating);
    return next();
  } catch(err){
    return next(createError({
      log: `error in addRating, ${err}`,
      message: 'error in addRating',
      err
    }));
  }
};

ratingsController.getRating = async (req, res, next) => {
  try {
    const userId = req.cookies.ssid;

    const restIds = [];

    if(res.locals.wishlist){
      res.locals.wishlist.forEach(el => {
        restIds.push(el.restaurant_id);
      });
    }

    if(res.locals.favorites){
      res.locals.favorites.forEach(el => {
        restIds.push(el.restaurant_id);
      });
    }

    if(res.locals.reviews){
      res.locals.reviews.forEach(el => {
        restIds.push(el.restaurant_id);
      });
    }

    const userRatings = await db.query(`SELECT * FROM ratings 
    WHERE restaurant_id IN (${restIds});`);

    res.locals.ratings = userRatings.rows;
    console.log('res.locals.ratings:', res.locals.ratings);
    return next();

  } catch (err) {
    return next(createError({
      log: `error in getRating, ${err}`,
      message: 'error in getRating',
      err
    }));
  }

};

ratingsController.editRating = async (req, res, next) => {

};


module.exports = ratingsController;