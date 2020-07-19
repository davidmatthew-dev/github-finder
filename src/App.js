import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: true,
	};

	// things like http requests should be in here
	async componentDidMount() {
		// define api call client ID and secret
		const ghclientid = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
		const ghclientsecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		// we need to set the state
		this.setState({ loading: true });
		// since we are using async/await, create a variable and set equal to await
		const res = await axios.get(
			`https://api.github.com/users?${ghclientid}&${ghclientsecret}`
		);

		// once we get the api data, set the state
		this.setState({ users: res.data, loading: false });
		// now we can console log the data
		//console.log(res.data);
	}

	// Class return so we use render to return data
	render() {
		return (
			// in jsx class are referred to as className instead of class
			<div className='App'>
				<Navbar />
				{/* place all content in a container*/}
				<div className='container'>
					<Search />
					{/* passing in loading and users as props */}
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
