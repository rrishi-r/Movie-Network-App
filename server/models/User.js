const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {  
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String,
  favoriteGenres: Array,
  favoriteActors: Array,
  preferredLanguage: Array,
  preferredNews: Array,
  email: String
});

module.exports = mongoose.model('MovieUserBase', UserSchema);