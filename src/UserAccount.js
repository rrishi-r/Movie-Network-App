import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Selections from '../Selections/Selections';
import UpdateUser from "../../UpdateUser";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import OpenAI from 'openai';
import Configuration from 'openai';
import OPENAI_API_KEY from "../../../src/openai";
import './UserAccount.css'


function UserAccount(){
	const [openaiValue, setOpenAiValue] = useState('');
	const [movieRecommendations, setmovieRecommendations] = useState('');
	const [moviePersonality, setmoviePersonality] = useState('');
	const [prompt, setPrompt] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	var status_value = params.get('status_value');
	console.log("status value found: ");
	console.log(status_value);
	console.log(typeof status_value);
	var username = params.get('username');
	var favoriteMovie = params.get('favoriteMovie');
	var favoriteGenre = params.get('favoriteGenre');
	var favoriteActor = params.get('favoriteActor');
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get('/envVariables');
			setOpenAiValue(response.data.OPENAI_API_KEY);
		  } catch (error) {
			console.error('Error fetching variable:', error);
		  }
		};

		fetchData();
	}, []);
	const handleClick1 = async (e) => {
		e.preventDefault();
		try {
			const api_url = "https://api.openai.com/v1/completions"
			const response = await axios.post(
			  api_url,
			  {
				prompt: "Recommend movies with the actor " + favoriteActor + " in the " + favoriteGenre + " genre and similar to the movie " + favoriteMovie + ". Include movie name and year and separate with a | (after first movie)",
				max_tokens: 100,
				model: "gpt-3.5-turbo-instruct"
			  },
			  {
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${openaiValue}`,
				},
			  },
			);
			console.log(response.data.choices[0].text);
			setmovieRecommendations(response.data.choices[0].text)
		} catch (e) {
			setApiResponse("Something is going wrong, Please try again.");
			console.log(e);
		  }
    
	};
	
	const handleClick2 = async (e) => {
		e.preventDefault();
		try {
			const api_url = "https://api.openai.com/v1/completions"
			const response = await axios.post(
			  api_url,
			  {
				prompt: "Generate my movie personality if my favorite movie is " + favoriteMovie + " my favorite actor is " + favoriteActor + " and my favorite genre is " + favoriteGenre + ". Answer in paragraph form.",
				max_tokens: 100,
				model: "gpt-3.5-turbo-instruct"
			  },
			  {
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${openaiValue}`,
				},
			  },
			);
			console.log(response.data.choices[0].text);
			setmoviePersonality(response.data.choices[0].text)
		} catch (e) {
			setApiResponse("Something is going wrong, Please try again.");
			console.log(e);
		  }
    
	};
	
	if(status_value === 'true'){
		console.log("true return");
		return(
			<div style={{ width: '100%', height: '100vh', backgroundColor: 'lightblue' }}>
				<header className="user-header">
					<h1>Welcome {username}!</h1>
				</header>
				<p> <strong>Username:</strong> {username} </p>
				<p> <strong>Favorite Movie:</strong> {favoriteMovie} </p>
				<p> <strong>Favorite Genre:</strong> {favoriteGenre} </p>
				<p> <strong>Favorite Actor:</strong> {favoriteActor} </p>
				<ul className="custom-list">
					<li className="custom-list-item">
						<Link to="/Selections"style={{position: 'absolute', top: '15%', left: '80%', fontSize: '20px'}}>Find a movie</Link>
					</li>
				</ul>
				<ul className="custom-list">
					<li className="custom-list-item">
						<Link to={`/UpdateUser/${username}`} style={{position: 'absolute', top: '25%', left: '80%', fontSize: '20px'}}>Update movie preferences</Link>
					</li>
				</ul>
				<button style={{position: 'absolute', top: '50%', left: '0%', fontSize: '17px'}}
					onClick={handleClick1}>Generate Movie Recommendations
				</button>
				<button style={{position: 'absolute', top: '70%', left: '0%', fontSize: '17px'}}
					onClick={handleClick2}>Generate Your Movie Personality
				</button>
				<div style={{position: 'absolute', top: '56%', left: '0%', fontSize: '15px'}}>{movieRecommendations}</div>
				<div style={{position: 'absolute', top: '76%', left: '0%', fontSize: '15px'}}>{moviePersonality}</div>
			</div>
		
		);
	}
	else{
		console.log("false return");
		return(
			<div  style={{ width: '100%', height: '100vh', backgroundColor: 'lightblue' }}>
				<p> Incorrect username or password entered. </p>
			</div>
		);
	}
};

export default UserAccount;
	