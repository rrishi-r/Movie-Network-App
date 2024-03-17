import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const username_input = useParams().username;
  console.log("username: ");
  console.log(username_input);
  const [formData, setFormData] = useState({
    username: username_input,
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
    const response = await axios.post('http://localhost:3001/update', formData, {mode: 'no-cors',});
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
		historyCommand.push(argument);
	}
	else{
		argument = '/UserAccount?status_value=';
		argument = argument.concat(response.data.status_value);
		historyCommand.push(argument);
	}
	  
    
  };

  return (
    <form onSubmit={HandleSubmit}>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUser;