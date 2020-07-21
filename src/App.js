import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null,
		repos: [],
	};

	// create searchUsers that accepts text from Search
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const { usersURI } = this.httpReq(text);
		const res = await axios.get(usersURI);
		// set the state of users when the data is returned
		this.setState({ users: res.data.items, loading: false });
	};

	getUser = async (user) => {
		this.setState({ loading: true });
		const { userURI } = this.httpReq(user);
		const res = await axios.get(userURI);
		// set the state of user with the data returned
		this.setState({ user: res.data, loading: false });
	};

	getRepos = async (user) => {
		this.setState({ loading: true });
		const { userRepoURI } = this.httpReq(user, 5);
		const res = await axios.get(userRepoURI);
		// set the state of repos with the data returned
		this.setState({ repos: res.data, loading: false });
	};

	// Clear users from previous search
	clearUsers = () => this.setState({ users: [], loading: false });

	// optional time param can be passed
	setAlert = (msg, type, time = 3000) => {
		this.setState({ alert: { msg, type } });

		// set a timeout for the alert to disappear
		setTimeout(() => {
			this.setState({ alert: null });
		}, time);
	};

	render() {
		// destructure this.state
		const { users, user, loading, alert, repos } = this.state;

		return (
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
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											// Evaluating if the button should show then passing true or false back to Search
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
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
										getUser={this.getUser}
										user={user}
										loading={loading}
										// to be able to call the repos from the User component, we need to call getRepos
										getRepos={this.getRepos}
										// pass in the repos state since all the data is here
										repos={repos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
	// define parts of the http request
	httpReq(data = 'davidmatthew-dev', per_page = 5, sort = 'created:asc') {
		const ghclientid = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
		const ghclientsecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const usersURI = `https://api.github.com/search/users?q=${data}&${ghclientid}&${ghclientsecret}`;
		const userURI = `https://api.github.com/users/${data}?${ghclientid}&${ghclientsecret}`;
		const userRepoURI = `https://api.github.com/users/${data}/repos?per_page=${per_page}&sort=${sort}&${ghclientid}&${ghclientsecret}`;

		return { usersURI, userURI, userRepoURI };
	}
}

export default App;
