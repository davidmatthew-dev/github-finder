import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import './App.css';

class App extends Component {
	// Class return so we use render to return data
	render() {
		return (
			// in jsx class are referred to as className instead of class
			<div className="App">
				<Navbar />
				<UserItem />
			</div>
		);
	}
}

export default App;
