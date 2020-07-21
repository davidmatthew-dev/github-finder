import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
	};

	// create searchUsers that accepts text from Search
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const { ghclientid, ghclientsecret, userBaseURI } = this.httpReq();
		const res = await axios.get(
			`${userBaseURI}?q=${text}&${ghclientid}&${ghclientsecret}`
		);

		this.setState({ users: res.data.items, loading: false });
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
		const { users, loading } = this.state;
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					{/* set searchUsers to a method within this component */}
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						// Evaluating if the button should show then passing true or false back to Search
						showClear={users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					{/* passing in loading and users as props */}
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
	// define parts of the http request
	httpReq() {
		const ghclientid = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
		const ghclientsecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const userBaseURI = `https://api.github.com/search/users`;
		return { ghclientid, ghclientsecret, userBaseURI };
	}
}

export default App;
