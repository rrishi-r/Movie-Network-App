const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const MovieUserBase = require('./models/User');
const emailUpdate = require('./emailUpdate');
const cron = require('node-cron');
const app = express();
const port = 3001;
const { spawn } = require('child_process');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

console.log("before email update function");

cron.schedule('51 12 * * *', () => {
	emailUpdate();
})

app.post('/register', async (req, res) => {
    const { firstName, lastName, username, password, email, favoriteGenres, favoriteActors,
		preferredLanguage, preferredNews} = req.body;
	const userLookup = async (username_value) => {
		const user = await MovieUserBase.findOne({ username: username_value });
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
		console.log(firstName);
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new MovieUserBase({ username, password: hashedPassword, firstName: firstName, lastName: lastName, 
			email: email, favoriteGenres: favoriteGenres, favoriteActors: favoriteActors, preferredLanguage: preferredLanguage,
			preferredNews: preferredNews});
		console.log(user);
		await user.save();
	}
	else{
		var result = 'true';
	}
	res.json({ userFound: result });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username.length);
  console.log(password.length);
  try {
    const { username, password } = req.body;
	console.log(username);
	console.log(password);
    const user = await MovieUserBase.findOne({ username });
	result = true;

    if (!user) {
		console.log("if statement 1")
		result = false;
		res.json({ status_value: false});
    } 
	else if(!(await bcrypt.compare(password, user.password))){
		console.log("if statement 2")
		result = false;
		res.json({ status_value: false});
	}
	else{
		console.log("if statement 5")
		console.log(user);
		res.json({ firstName: user.firstName, 
			lastName: user.lastName, 
			email: user.email, 
			username: user.username, 
			password: user.password, 
			favoriteGenres: user.favoriteGenres, 
			favoriteActors: user.favoriteActors, 
			preferredLanguage: user.preferredLanguage,
			preferredNews: user.preferredNews
			});
	}
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/update', async (req, res) => {
  console.log("in update function");
  result = true;
  try {
    const { username, favoriteMovie, favoriteActor, favoriteGenre, email } = req.body;
	console.log("inputs");
	console.log(username);
	console.log(favoriteMovie);
	console.log(favoriteActor);
	console.log(favoriteGenre);
    const user = await MovieUserBase.findOne({ username });
	result = true;

    if (!user) {
		result = false;
		res.json({ status_value: false});
    } 
	else{
		const key = { username: username };
		const preferences = { $set: { favoriteMovie: favoriteMovie, favoriteActor: favoriteActor, favoriteGenre: favoriteGenre, email: email } };

		const update_user = await MovieUserBase.findOneAndUpdate(key, preferences, { upsert: true, new: true });

		console.log(user);
		res.json({ status_value: true, username: user.username, favoriteMovies: user.favoriteMovies, favoriteGenres: user.favoriteGenres, favoriteActors: user.favoriteActors });
	}
  } catch (error) {
		console.log(error);
  }
  	const current_users = await MovieUserBase.find({});
  	console.log('User List:', current_users);
});

app.post('/generateNews', async (req, res) => {
	console.log("generate news function");
	console.log(req.body);
	var { favoriteGenres, favoriteActors, preferredLanguage, preferredNews } = req.body;
	favoriteGenres = JSON.stringify(favoriteGenres);
	favoriteActors = JSON.stringify(favoriteActors);	
	preferredLanguage = JSON.stringify(preferredLanguage);
	preferredNews = JSON.stringify(preferredNews);
	const findNews = spawn('python', ['./searchWeb.py', preferredNews, favoriteGenres, 
	favoriteActors, preferredLanguage]);
	console.log(preferredNews);
	console.log(favoriteActors);
	console.log(favoriteGenres);
	console.log(preferredLanguage);
	findNews.stdout.on('data', function(data) { 
        res.send(JSON.parse(data.toString()));
	});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});