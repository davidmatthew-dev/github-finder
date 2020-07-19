import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import './App.css';

class App extends Component {
	// Class return so we use render to return data
	render() {
		return (
			<div className="App">
				<h1>Hello from React</h1>
			</div>
		);
	}
}

export default App;
