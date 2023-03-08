const Jwt = require('jsonwebtoken');
require('dotenv').config();

const cookieController = {};

cookieController.setJWTCookie = async (req, res, next) => {
  try {
  //   const createJWT = email => {
  //     const token = Jwt.sign({
  //       email: email,
  //     }, process.env.JWT_SECRET_KEY);
  //     return token;
  //   };

    // const { email, password } = req.body;
    // console.log(req.body);
    // const jwtToken = createJWT(email);
    // res.locals.JWT = jwtToken;

    res.cookie('ssid', res.locals.user.user_id, {
      httpOnly: true
    });
    res.cookie('favorites', res.locals.collections.userFavorites.id, {
      httpOnly: true
    });
    res.cookie('wishlist', res.locals.collections.userWishlist.id, {
      httpOnly: true
    });
    res.cookie('reviews', res.locals.collections.userReviews.id, {
      httpOnly: true
    });
    return next();
  } 
  catch (error) {
    return next({
      log: `cookieController.setJWTCookie error, ${error}`,
      message: { err: error }
    });
  }
};

module.exports = cookieController;