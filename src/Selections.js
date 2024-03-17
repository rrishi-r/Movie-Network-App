import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import React, { useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Results from './Results.js';
import { useParams } from 'react-router-dom';
import OMDP_API_KEY from './omdp_api';

const surveyJson = {
  elements: [{
    name: "MovieType",
    title: "Enter movie type (movie, series, episode):",
    type: "text"
  }, {
    name: "YearRelease",
    title: "Enter year of release:",
    type: "text"
	}, {
	name: "KeyWord",
    title: "Enter a key word to help find a movie for you!",
    type: "text"
  }]
};

function Selections() {
  const historyCommand = useHistory();
  const survey = new Model(surveyJson);
  console.log('starting app!!');
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
	const userEntries = JSON.parse(results);
	const movieType = userEntries.MovieType;
	const yearRelease = userEntries.YearRelease;
	const keyWord = String(userEntries.KeyWord);
	var movieURL = 'http://www.omdbapi.com/?';
		console.log("KEYWORD", keyWord);
		console.log("KEYWORD LENGTH", keyWord.length);
		if(keyWord != undefined){
			movieURL = movieURL.concat('s=');
			movieURL = movieURL.concat(keyWord);
			console.log("updated movie URL", movieURL);
		} 
		if(movieType != undefined){
			movieURL = movieURL.concat('&type=');
			movieURL = movieURL.concat(movieType);
		}
		if(yearRelease != undefined){
			movieURL = movieURL.concat('&y=');
			movieURL = movieURL.concat(yearRelease);
		}
		movieURL = movieURL.concat('&apikey=' + OMDP_API_KEY);
	alert(results);
	var argument = '/Results?urlValue=';
	argument = argument.concat(encodeURIComponent(movieURL));
	historyCommand.push(argument);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default Selections;