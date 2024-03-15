import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import React, { useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Selections from "./Components/Selections/Selections";
import Results from "./Components/Results/Results";
import UserAccount from "./Components/User/UserAccount";
import RegistrationStatus from "./Components/User/RegistrationStatus";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import UpdateUser from "./UpdateUser";


function App() {
  return (
  <BrowserRouter>
    <div>
		<Route exact path="/">
			<li>
				<Link to="/LoginForm">Login</Link>
			</li>
		</Route>
        <Route exact path="/">
			<li>
				<Link to="/RegistrationForm">Register</Link>
			</li>
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
  </BrowserRouter>
  );
}

export default App;