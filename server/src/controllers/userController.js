const { query } = require('express');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const db = require('../models/userModels.js');

const createError = (errorInfo) => {
  const {method, type, error} = errorInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
    message: {err: `error occurreed in userController.${method}. Check server logs for more details.`}
  };
};

const userController = {};

userController.verifyUser = async (req, res, next) => {
  try {
    //test: console-log params to make sure params are being sent over
    const { email, password } = req.body;

    //test: ensure req.params are appropriately saved as consts
    // console.log('email: ', email,  'password : ', password)
    
    const queryResult = await db.query(`SELECT * FROM users WHERE email = '${email}';`);

    if (queryResult.rows[0] === undefined) {
      res.locals.status = 300;
      return next();
    }
    else {
      // console.log('HERE!!!!');
      bcrypt.compare(password, queryResult.rows[0].password)
        .then(result => {
          // console.log('Here!');
          if (!result) res.locals.status = 300;
          else {
            res.locals.user = queryResult.rows[0];
            // console.log('HERE',res.locals.user);
            return next();
          }
        });
    }
  }
  catch (error){
    next({
      log: 'error running verifyUser middleware. ',
      message: 'an error occurred trying to find user'
    });
  }
};

userController.createUser = async (req, res, next) => {
  try{
    const { name, email, password } = req.body;
    console.log(req.body);
    // TODO: change from truthy to different logic later
    if(!name || !password || !email){
      res.locals.status = 300;
      next(createError({
        method: 'createUser',
        type: 'all fields must be filled',
        error: 'all fields must be filled'
      }));
    }

    const checkEmail = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
    // console.log('!!!!!!!! checkEmail : ', checkEmail );
    if (checkEmail.rowCount !== 0){
      res.locals.status = 300;
      next({
        log: 'email already exists',
        message: {err: 'email already exists'}
      });
    }
    
    let hashedPW;

    bcrypt.hash(password, SALT_WORK_FACTOR)
      .then(async hash => {
        hashedPW = hash;
        // console.log('hashed pw', hashedPW);
        //creating the user instance in the database
        const created = await db.query(
          `INSERT INTO users (email, name, password) 
          VALUES ('${email}', '${name}', '${hashedPW}')
          RETURNING *;`
        );
        
        //getting that instance from the database and saving it to res.locals
        // const queryResult = await db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`);
        res.locals.user = created.rows[0];
        console.log('user is:', res.locals.user);
        
        const userID = res.locals.user.user_id;
        
    
        //creating three new instances of Collections based on that user's userID
        await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'favorites');`
        );
    
        await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'wishlist');`
        );
    
        await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'reviews');`
        );
    
        const userFavorites = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'favorites'`);
        const userWishlist = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'wishlist'`);
        const userReviews = await db.query(`SELECT * FROM users WHERE user_id = '${userID}' AND name = 'reviews'`);
    
        const collections = {
          userFavorites: userFavorites,
          userWishList: userWishlist,
          userReviews: userReviews
        };
    
        res.locals.collections = collections;
        
        return next();
      
      })
      .catch(error => {
        return next({
          log: 'userController bcrypt() ERROR:' + error,
          message: {err: error}
        });
      });
  } 
  catch(error){
    return next({
      log: 'userController.createUser() ERROR' + error,
      message: {err: error}
    });
  }
};


module.exports = userController;