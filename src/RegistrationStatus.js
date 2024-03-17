import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function RegistrationStatus(){
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
	