const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true},
  //10 minutes
  createdAt: { type: Date, expires: 600, default: Date.now}
});

module.exports = mongoose.model('Session', sessionSchema);