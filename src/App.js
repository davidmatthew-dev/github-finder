import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
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

	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					{/* set searchUsers to a method within this component */}
					<Search searchUsers={this.searchUsers} />
					{/* passing in loading and users as props */}
					<Users loading={this.state.loading} users={this.state.users} />
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
