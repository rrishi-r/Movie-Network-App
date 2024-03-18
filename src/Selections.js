import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import React, {useEffect, useState} from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


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
  const [omdpValue, setOmdpValue] = useState('');
  useEffect(() => {
	const fetchData = async () => {
	  try {
		const response = await axios.get('/envVariables');
		setOmdpValue(response.data.OMDP_API_KEY);
	  } catch (error) {
		console.error('Error fetching variable:', error);
	  }
	};
	fetchData();
  }, []);
  const historyCommand = useHistory();
  const survey = new Model(surveyJson);
  console.log('starting app!!');
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
	const userEntries = JSON.parse(results);
	const movieType = userEntries.MovieType;
	const yearRelease = userEntries.YearRelease;
	const keyWord = String(userEntries.KeyWord);
	var movieURL = 'https://www.omdbapi.com/?';
		console.log("KEYWORD", keyWord);
		console.log("KEYWORD LENGTH", keyWord.length);
		if(keyWord !== undefined){
			movieURL = movieURL.concat('s=');
			movieURL = movieURL.concat(keyWord);
			console.log("updated movie URL", movieURL);
		} 
		if(movieType !== undefined){
			movieURL = movieURL.concat('&type=');
			movieURL = movieURL.concat(movieType);
		}
		if(yearRelease !== undefined){
			movieURL = movieURL.concat('&y=');
			movieURL = movieURL.concat(yearRelease);
		}
		movieURL = movieURL.concat('&apikey=' + process.env.omdpValue);
	alert(results);
	var argument = '/Results?urlValue=';
	argument = argument.concat(encodeURIComponent(movieURL));
	historyCommand.push(argument);
  }, [historyCommand]);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default Selections;