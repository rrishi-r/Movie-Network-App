const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: 'https://main--cerulean-chimera-e4b05d.netlify.app/' }));

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {  
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  favoriteMovie: String,
  favoriteGenre: String,
  favoriteActor: String
});

const Users = mongoose.model('Users', UserSchema);

app.post('/register', async (req, res) => {
    const { username, password, favoriteMovie, favoriteGenre, favoriteActor } = req.body;
	const userLookup = async (username_value) => {
		const user = await Users.findOne({ username: username_value });
		if(user){
			return true;
		}
		else{
			return false;
		}
	};
	user_exists = await userLookup(username);
	console.log("user exists");
	console.log(user_exists);
	var result = 'false';
	if(user_exists === false){
		console.log("user does not exist");
		console.log(favoriteMovie);
		console.log(favoriteGenre);
		console.log(favoriteActor);
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new Users({ username, password: hashedPassword, favoriteMovie: favoriteMovie, favoriteGenre: favoriteGenre, favoriteActor: favoriteActor });
		console.log(user);
		await user.save();
	}
	else{
		var result = 'true';
	}
	res.json({ userFound: result });
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
	result = true;

    if (!user) {
		result = false;
		res.json({ status_value: false});
    } 
	else if(!(await bcrypt.compare(password, user.password))){
		result = false;
		res.json({ status_value: false});
	}
	else{
		console.log(user);
		res.json({ status_value: true, username: user.username, favoriteMovie: user.favoriteMovie, favoriteGenre: user.favoriteGenre, favoriteActor: user.favoriteActor });
	}
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/update', async (req, res) => {
  console.log("in update function");
  result = true;
  try {
    const { username, favoriteMovie, favoriteActor, favoriteGenre } = req.body;
	console.log("inputs");
	console.log(username);
	console.log(favoriteMovie);
	console.log(favoriteActor);
	console.log(favoriteGenre);
    const user = await Users.findOne({ username });
	result = true;

    if (!user) {
		result = false;
		res.json({ status_value: false});
    } 
	else{
		const key = { username: username };
		const preferences = { $set: { favoriteMovie: favoriteMovie, favoriteActor: favoriteActor, favoriteGenre: favoriteGenre } };

		const update_user = await Users.findOneAndUpdate(key, preferences, { upsert: true, new: true });

		console.log(user);
		res.json({ status_value: true, username: user.username, favoriteMovie: user.favoriteMovie, favoriteGenre: user.favoriteGenre, favoriteActor: user.favoriteActor });
	}
  } catch (error) {
		console.log(error);
  }
  const current_users = await Users.find({});
  console.log('User List:', current_users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});