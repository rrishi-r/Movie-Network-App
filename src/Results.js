import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Results(){
	const [movieResults, setmovieResults] = useState([]);
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	var url = params.get('urlValue');
	url = decodeURIComponent(url);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(url);
			const results = await response.json();
			console.log(results.Search);
			setmovieResults(results.Search);
			console.log(movieResults);
		};
		fetchData();
		
	}, []);
	return (
		<table style={{borderSpacing:'8px'}}>
		  <thead>
			<tr>
			  <th>Film Title</th>
			  <th>Year Released</th>
			  <th>Film Type</th>
			</tr>
		  </thead>
		  <tbody>
			{movieResults.map((item) => (
			  <tr key={item.id}>
				<td>{item.Title}</td>
				<td>{item.Year}</td>
				<td>{item.Type}</td>
			  </tr>
			))}
		  </tbody>
		</table>
  );
	
	
	

}
export default Results;