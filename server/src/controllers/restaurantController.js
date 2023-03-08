const { query } = require('express');
const db = require('../models/userModels.js');

const restaurantController = {};

restaurantController.addRestaurant = async (req, res, next) => {
  try{
    const {name, cuisine, price_rating, hours, address, delivery, menu_url} = req.body.restaurant;
    //check if restaurant is already stored in database by checking if restaurant_id exists
    const queryRestaurant = await db.query(`SELECT * FROM restaurants WHERE name = '${name}' AND address = '${address}'`);
    if(queryRestaurant.rowCount !== 0) {
      res.locals.restID = queryRestaurant.rows[0].restaurant.restaurant_id;
      res.locals.restName = req.body.restaurant.name;
      console.log('restName', res.locals.restName);
      console.log('restID', res.locals.restID);
      return next();
    } 
    else {
      const {name, cuisine, price_rating, hours, address, delivery, menu_url} = req.body.restaurant;
      const newRestaurant = await db.query(
        `INSERT INTO restaurants (name, cuisine, price_rating, hours, address, delivery, menu_url) 
        VALUES ('${name}', '${cuisine}', '${price_rating}', '${hours}', '${address}', '${delivery}', '${menu_url}')
        RETURNING *;`
      );
      console.log('newRestaurant', newRestaurant);
      // const newRestaurant = await db.query(`SELECT * FROM restaurants WHERE name = '${name}' AND address = '${address}'`);
      res.locals.restID = newRestaurant.rows[0].restaurant_id;
      res.locals.restName = newRestaurant.rows[0].name;
      return next();
    }
  }
  catch(err){
    return next({
      log: 'an error occurred in addRestaurtant',
      message: 'an error occurred',
      err
    });
  }
};

module.exports = restaurantController;

