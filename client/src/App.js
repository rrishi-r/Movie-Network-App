import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import UserAccount from './components/UserAccount.jsx';
import UpdateUser from './components/UpdateUser.jsx';

function App() {
	return(
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />	
				<Route path="/RegistrationForm" element={<RegistrationForm />} />
				<Route path="/LoginForm" element={<LoginForm />} />
				<Route path="/UserAccount" element={<UserAccount />} />
				<Route path="/UpdateUser" element={<UpdateUser />} />
			</Routes>
		</Router>
	)
}

export default App;