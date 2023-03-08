const { query } = require('express');
const db = require('../models/userModels.js');

const restaurantController = {};

restaurantController.addRestaurant = async (req, res, next) => {
  try{
    const queryRestaurant = await db.query(`SELECT * FROM restaurants WHERE name = '${name}' AND address = '${address}'`);
    if(queryRestaurant.rowCount !== 0) {
      res.locals.restID = queryRestaurant.rows[0].restaurant_id;
      return next();
    }
    const {name, cuisine, price_rating, hours, address, delivery, menu_url} = req.body.restaurant;
    await db.query(
      `INSERT INTO restaurants (name, cuisine, price_rating, hours, address, delivery, menu_url) 
      VALUES ('${name}', '${cuisine}', '${price_rating}', '${hours}', '${address}', '${delivery}', '${menu_url}')`
    );
    const newRestaurant = await db.query(`SELECT * FROM restaurants WHERE name = '${name}' AND address = '${address}'`);
    res.locals.restID = newRestaurant.rows[0].restaurant_id;
    return next();

  }
  catch(err){
    return next({
      log: 'an error occurred',
      message: 'an error occurred'
    });
  }
};

