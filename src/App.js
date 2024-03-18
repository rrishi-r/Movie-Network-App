import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import React, { useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Selections from "./Selections";
import Results from "./Results";
import UserAccount from "./UserAccount";
import RegistrationStatus from "./RegistrationStatus";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import UpdateUser from "./UpdateUser";
import '../src/styles/App.css'
import homepageImage from '../src/assets/home-page-image.png'


function App() {
  return (
  <div style={{ width: '100%', height: '100vh', backgroundColor: 'lightcoral' }}>
	  <BrowserRouter>
		<header style={{fontFamily: 'cursive', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', textDecoration: 'underline', paddingTop: '20px'}}>
			<h1>The Movie Network</h1>
		</header>
		<div>
		<Route exact path="/">
			<ul className="custom-list">
				<li className="custom-list-item">
					<Link to="/LoginForm" style={{position: 'absolute', top: '3%', left: '90%', fontSize: '20px'}}>Login</Link>
				</li>
			</ul>
		</Route>
		<Route exact path="/">
			<ul className="custom-list">
				<li className="custom-list-item">
					<Link to="/RegistrationForm" style={{position: 'absolute', top: '8%', left: '90%', fontSize: '20px'}}>Register</Link>
				</li>
			</ul>
		</Route>
		</div>
		<Switch>
		<Route path="/LoginForm" exact component={LoginForm} />
		<Route path="/RegistrationForm" component={RegistrationForm} />
		<Route path="/UpdateUser" exact component={UpdateUser} />
		<Route path="/Selections" component={Selections} />
		<Route path="/Results" component={Results} />
		<Route path="/RegistrationStatus" component={RegistrationStatus} />
		<Route 
			path="/UserAccount" 
			component={UserAccount} 
			/>
		<Route path="/UpdateUser/:username" component={UpdateUser} />
		</Switch>
		<img src={homepageImage} alt="Homepage Image" style={{clipPath: 'inset(60px 0 0 0)', marginLeft: 'auto'}} />
	  </BrowserRouter>
  </div>
  );
}

export default App;