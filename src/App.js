import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
	// sets default states via useState
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [repos, setRepos] = useState([]);

	const getUser = async (user) => {
		setLoading(true);
		const { userURI } = httpReq(user);
		const res = await axios.get(userURI);
		// set the state of user with the data returned
		setUser(res.data);
		setLoading(false);
	};

	const getRepos = async (user) => {
		setLoading(true);
		const { userRepoURI } = httpReq(user, 5);
		const res = await axios.get(userRepoURI);
		// set the state of repos with the data returned
		setRepos(res.data);
		setLoading(false);
	};

	// Clear users from previous search
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// optional time param can be passed
	const showAlert = (msg, type, time = 3000) => {
		setAlert({ msg, type });

		// set a timeout for the alert to disappear
		setTimeout(() => {
			setAlert(null);
		}, time);
	};

	// define parts of the http request
	const httpReq = (data, per_page = 5, sort = 'created:asc') => {
		const ghclientid = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
		const ghclientsecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const usersURI = `https://api.github.com/search/users?q=${data}&${ghclientid}&${ghclientsecret}`;
		const userURI = `https://api.github.com/users/${data}?${ghclientid}&${ghclientsecret}`;
		const userRepoURI = `https://api.github.com/users/${data}/repos?per_page=${per_page}&sort=${sort}&${ghclientid}&${ghclientsecret}`;

		return { usersURI, userURI, userRepoURI };
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
										<Search
											clearUsers={clearUsers}
											// Evaluating if the button should show then passing true or false back to Search
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>
										{/* passing in loading and users as props */}
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							{/* About Route */}
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={getUser}
										user={user}
										loading={loading}
										// to be able to call the repos from the User component, we need to call getRepos
										getRepos={getRepos}
										// pass in the repos state since all the data is here
										repos={repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
