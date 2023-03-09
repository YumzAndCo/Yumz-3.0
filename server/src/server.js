require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

//controllers
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const collectionsController = require('./controllers/collectionsController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const ratingsController = require('./controllers/ratingsController');

const app = express();
const apiRouter = require('./routes/apiRouter');
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


//Routes
app.use('/api', apiRouter);

//sign up route - when user is successfully created, cookie is set and session is started
app.post('/api/signup', userController.createUser,
  cookieController.setJWTCookie,
  sessionController.startSession,
  (req, res) => {
    if (res.locals.status === 300) return res.sendStatus(300);
    res.status(200).json(res.locals.session);
  });

//login route - upon successful user verification, cookie is set and session is started
app.post('/api/login', userController.verifyUser,
  cookieController.setJWTCookie,
  sessionController.startSession,
  (req, res) => {
    if (res.locals.status === 300) return res.sendStatus(300);
    res.status(200).json(res.locals.session);
  });

//route for verifying sessions
app.get('/api/session', sessionController.isLoggedIn, (req, res) => {
  res.sendStatus(200);
});

//route for logging out - deletes session from database
app.delete('/api/logout', sessionController.deleteSession, (req, res) => {
  res.sendStatus(200);
});

app.post('/api/addToWishlist', restaurantController.addRestaurant, 
  ratingsController.addRating,
  collectionsController.addToWishlist, (req, res) => {
    res.status(200).json(res.locals.newWishlistItem);
  });

app.post('/api/addToFavorites', restaurantController.addRestaurant,
  ratingsController.addRating,
  collectionsController.addToFavorites, (req, res) => {
    res.status(200).json(res.locals.newFavoritesItem);
  });

app.post('/api/addToReviews', restaurantController.addRestaurant, 
  ratingsController.addRating,
  collectionsController.addToReviews, (req, res) => {
    res.status(200).json(res.locals.newReviewItem);
  });

app.get('/api/reviews', collectionsController.getReviews,
  ratingsController.getRating, (req, res) => {
    res.status(200).json(res.locals);
  });

app.get('/api/favorites', collectionsController.getFavorites, 
  ratingsController.getRating, (req, res) => {
    res.status(200).json(res.locals);
  });

app.get('/api/wishlist', collectionsController.getWishlist,
  ratingsController.getRating, (req, res) => {
    res.status(200).json(res.locals);
  });

app.patch('/api/editRating', ratingsController.editRating, (req, res) => {
  res.status(200).json(res.locals.ratings);
});

app.get('/api/user', userController.getUser,
  collectionsController.getFavoritesRatings, (req, res) => {
    res.status(200).json(res.locals);
  });

app.post('/api/profilepic', userController.setProfilePicture, (req, res) => {
  res.status(200).json(res.locals.profile_picture);
});

app.post('/api/userbio', userController.setBio, (req, res) => {
  res.status(200).json(res.locals.bio);
});

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../../client/src/index.html'));
// });

app.use((error, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'}
  };
  const errorObj = Object.assign({}, defaultErr, error);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//connect mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(console.log('connected to MongoDB'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;