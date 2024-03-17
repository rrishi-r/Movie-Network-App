import { useLocation, useHistory} from 'react-router-dom';
import React, {useEffect} from 'react';

function RegistrationStatus(){
	const history = useHistory();
	useEffect(() => {
		const redirectTimeout = setTimeout(() => {
		  history.push('./');
		}, 1000); 

		return () => clearTimeout(redirectTimeout);
	}, [history]); 
	console.log("registration status function");
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	var userFound = params.get('userFound');
	if(userFound === 'true'){
		return(
			<div>
				<p> User already exists! Please select a different username. </p>
			</div>
		);
	}
	else{
		return(
			<div>
				<p> Successfully registered as a new user! </p>
			</div>
		);
	}
	
};
export default RegistrationStatus;
	