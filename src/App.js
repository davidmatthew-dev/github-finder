import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
	// sets default states via useState
	const [alert, setAlert] = useState(null);

	// optional time param can be passed
	const showAlert = (msg, type, time = 3000) => {
		setAlert({ msg, type });

		// set a timeout for the alert to disappear
		setTimeout(() => {
			setAlert(null);
		}, time);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						{/* set searchUsers to a method within this component */}
						<Alert alert={alert} />
						<Switch>
							{/* Main Page Route */}
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search setAlert={showAlert} />
										{/* passing in loading and users as props */}
										<Users />
									</Fragment>
								)}
							/>
							{/* About Route */}
							<Route exact path='/about' component={About} />
							<Route exact path='/user/:login' component={User} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
