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
    const { email, password } = req.body;

    // console.log('email: ', email,  'password : ', password)
    
    const queryResult = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
    const collections = await db.query(`SELECT * FROM collection
    WHERE user_id = ${queryResult.rows[0].user_id};`);

    console.log(collections.rows);
    
    const collection = {
      userFavorites: collections.rows[0],
      userWishlist: collections.rows[1],
      userReviews: collections.rows[2]
    };

    if (queryResult.rows[0] === undefined) {
      res.locals.status = 300;
      return next();
    }
    else {
      bcrypt.compare(password, queryResult.rows[0].password)
        .then(result => {
          if (!result) res.locals.status = 300;
          else {
            res.locals.user = queryResult.rows[0];
            res.locals.collections = collection;
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
        
        res.locals.user = created.rows[0];
        console.log('user is:', res.locals.user);
        
        const userID = res.locals.user.user_id;
        
    
        //creating three new instances of Collections based on that user's userID
        const userFavorites = await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'favorites')
          RETURNING *;`
        );
    
        const userWishlist = await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'wishlist')
          RETURNING *;`
        );
    
        const userReviews = await db.query(
          `INSERT INTO collection (user_id, name)
          VALUES ('${userID}', 'reviews')
          RETURNING *;`
        );
  
    
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

userController.getUser = async (req, res, next) => {
  try {
    const userId = req.cookies.ssid;
    const queryResult = await db.query(`SELECT * 
    FROM users 
    WHERE user_id = ${userId};`);
    res.locals.profile = queryResult.rows;
    return next();
  }
  catch(error) {
    return next({
      log: 'userController.getUser() ERROR' + error,
      message: {err: error}
    });
  }
};

userController.setProfilePicture = async (req, res, next) => {
  try {
    const userId = req.cookies.ssid;
    const { profilePic } = req.body;

    const picURL = await db.query(`UPDATE users
      SET profile_picture = '${profilePic}'
      WHERE user_id = ${userId}
      RETURNING * ;`);
    
    res.locals.profile_picture = picURL.rows;
    return next();

  } catch(err){
    return next(createError({
      log: `error in userController.setProfilePicture, ${err}`,
      message: 'error in setProfilePicture',
      err
    }));
  }
};

userController.setBio = async (req, res, next) => {
  try {
    const userId = req.cookies.ssid;
    const { bio } = req.body;
    
    const updateBio = await db.query(`UPDATE users
     SET bio = ${bio} 
     WHERE user_id = ${userId}
     RETURNING *;`);

    res.locals.bio = updateBio.rows;
    return next();
  }
  catch(error) {
    return next({
      log: 'userController.setBio() ERROR' + error,
      message: {err: error}
    });
  }
}


module.exports = userController;