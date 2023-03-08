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
  collectionsController.addToWishlist, (req, res) => {
    res.status(200).json(res.locals.newWishlistItem);
  });

// app.post('/api/addToFavorites', restaurantController.addRestaurant, collectionsController.addToFavorites, (req, res) => {
//   res.status(200);
//   res.send(res.locals);
// });

app.post('/api/addToReviews', restaurantController.addRestaurant,
  collectionsController.addToReviews, (req, res) => {
    res.status(200).json(res.locals.newReviewItem);
  });

// app.get('/api/reviews', collectionsController.getReviews, (req, res) => {
//   res.status(200).send()
// })

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