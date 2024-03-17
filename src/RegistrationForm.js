import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
	favoriteMovie: '',
	favoriteGenre: '',
	favoriteActor: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const historyCommand = useHistory();

  const handleSubmit = async (e) => {
	console.log("handling submit");
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
	  console.log("registration response");
	  console.log(response);
	  console.log("argument");
	  var argument = '/RegistrationStatus?userFound=';
	  console.log("argument");
	  console.log(argument);
	  argument = argument.concat(response.data.userFound);
	  console.log("argument");
	  console.log(argument);
	  console.log("before history");
	  historyCommand.push(argument);
	  console.log("after history");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
	  <input
        type="text"
        name="favoriteMovie"
        placeholder="Favorite Movie"
        value={formData.favoriteMovie}
        onChange={handleChange}
        required
      />
	  <input
        type="text"
        name="favoriteGenre"
        placeholder="Favorite Genre"
        value={formData.favoriteGenre}
        onChange={handleChange}
        required
      />
	  <input
        type="text"
        name="favoriteActor"
        placeholder="Favorite Actor"
        value={formData.favoriteActor}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;