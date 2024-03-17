import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
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
    title: "Any key word that will help find the best movie for you!",
    type: "text"
  }]
};
function SurveyEntry() {
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
	const userEntries = JSON.parse(results);
	const movieType = userEntries.MovieType;
	const yearRelease = userEntries.YearRelease;
	const keyWord = userEntries.KeyWord;
	const fetchData = async () => {
		var movieURL = 'http://www.omdbapi.com/?';
		if(keyWord.length != 0){
			movieURL.concat('s=${keyWord}');
		} 
		if(movieType.length != 0){
			movieURL.concat('&type=${movieType}');
		}
		if(yearRelease.length != 0){
			movieURL.concat('&y=${yearRelease}');
		}
		const response = await axios.get(movieURL); 
		console.log(movieURL);
    };
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default SurveyEntry;