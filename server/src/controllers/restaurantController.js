const { query } = require('express');
const db = require('../models/userModels.js');

const restaurantController = {};

restaurantController.addRestaurant = async (req, res, next) => {
  try{
    console.log('body is', req.body);
    const {name, category, hours, address, delivery, menu} = req.body;
    //check if restaurant is already stored in database by checking if restaurant_id exists
    const queryRestaurant = await db.query(`SELECT * FROM restaurants WHERE name = '${name}' AND address = '${address}'`);
    if(queryRestaurant.rowCount !== 0) {
      res.locals.restID = queryRestaurant.rows[0].restaurant_id;
      res.locals.restName = req.body.name;
      console.log('restName', res.locals.restName);
      console.log('restID', res.locals.restID);
      return next();
    } 
    else {
      // console.log(req.body)
      const newRestaurant = await db.query(
        `INSERT INTO restaurants (name, cuisine, hours, address, offers_delivery, menu_url) 
        VALUES ('${name}', '${category}', '${hours}', '${address}', '${delivery}', '${menu}')
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
      log: `an error occurred in addRestaurtant, ${err}`,
      message: 'an error occurred',
      err
    });
  }
};

module.exports = restaurantController;

