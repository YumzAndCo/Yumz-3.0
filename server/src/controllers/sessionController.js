require('dotenv').config();

// const Jwt = require('jsonwebtoken');
const Session = require('../models/sessionModel');

// const verifyJWT = token => {
//   return Jwt.verify(token, process.env.JWT_SECRET_KEY);
// };

const createError = (errorInfo) => {
  const {method, type, error} = errorInfo;
  return {
    log: `sessionController.${method} ${type}: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
    message: {err: `error occurreed in sessionController.${method}. Check server logs for more details.`}
  };
};

const sessionController = {};

//create and save in db new session
sessionController.startSession = async (req, res, next) => {
  try {
    Session.create({cookieId: res.locals.user.user_id})
      .then(response => {
        res.locals.session = response;
        return next();
      });

    // console.log(res.locals.JWT);
    // const isValidJWT = verifyJWT(res.locals.JWT);
    // // This is really ugly and should be refactored eventually
    // if (isValidJWT) {
    //   return next();
  } 
  catch (error) {
    res.locals.status = 300;
    next(createError({
      method: 'startSession',
      type: 'starting session has failed',
      error
    }));
  }
};

//for verifying the session
sessionController.isLoggedIn = async (req, res, next) => {
  try {
    // const isValidJWT = verifyJWT(req.cookies.JWT);
    // if (!isValidJWT) res.locals.status = 300; // This code will bug and always return a status of 300 but for now is unused
    // return next();
    const cookieId = req.cookies.ssid;

    const session = await Session.findOne({cookieId: cookieId});
    if(!session){
      res.locals.status = 300;
      next(createError({
        method: 'sessionController.isLoggedIn',
        type: 'session was not found!',
      }));
    }
    res.locals.session = session;

    return next();
  } 
  catch (error) {
    res.locals.status = 300;
    next(createError({
      method: 'isLoggedIn',
      type: 'error in sessionController.isLoggedIn',
      error
    }));
  }
};

//delete session when user logs out
sessionController.deleteSession = async (req, res, next) => {
  try {
    const cookieId = req.cookies.ssid;
    const session = await Session.deleteOne({cookieId: cookieId});
    if (!session) {
      return next(createError({
        method: 'sessionController.deleteSession',
        type: 'session was not found!',
      }));
    }
    res.locals.session = session;
    res.clearCookie('ssid');
    return next();
  } 
  catch(err) {
    return next(createError({
      method: 'sessionController.deleteSession',
      type: 'unknown error in deleteSession',
      err
    }));
  }
};

module.exports = sessionController;