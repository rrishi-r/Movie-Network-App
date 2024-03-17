import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
	favoriteMovie: '',
	favoriteGenre: '',
	favoriteActor: '',
	status_value: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const historyCommand = useHistory();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post('https://movie-networking-app-backend.onrender.com/login', formData, {mode: 'no-cors',});
    console.log(response);
	if(response.data.status_value === true){
		var argument = '/UserAccount?username=';
		argument = argument.concat(response.data.username);
		argument = argument.concat('&favoriteMovie=');
		argument = argument.concat(response.data.favoriteMovie);
		argument = argument.concat('&favoriteGenre=');
		argument = argument.concat(response.data.favoriteGenre);
		argument = argument.concat('&favoriteActor=');
		argument = argument.concat(response.data.favoriteActor);
		argument = argument.concat('&status_value=');
		argument = argument.concat(response.data.status_value);
		console.log("status value!: ");
		console.log(response.data.status_value);
		console.log("before history command");
		console.log(argument);
		historyCommand.push(argument);
		console.log("after history command");
	}
	else{
		argument = '/UserAccount?status_value=';
		argument = argument.concat(response.data.status_value);
		console.log("status value: ");
		console.log(response.data.status_value);
		console.log("before history command");
		console.log(argument);
		historyCommand.push(argument);
		console.log("after history command");
	}
	  
    
  };

  return (
    <form onSubmit={HandleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;