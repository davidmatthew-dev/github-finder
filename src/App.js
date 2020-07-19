import React, { Component } from 'react'; // instead of typing React.Component each time, we also import Component from react
import './App.css';

class App extends Component {
	fooMethod = () => "Bar - you're a method of the class";
	// Class return so we use render to return data
	render() {
		// you can add javascript, functions or variables directly to the page
		const name = 'ItzFeral';
		const foo = () => 'Bar';
		return (
			// in jsx class are referred to as className instead of class
			<div className="App">
				{/* JSX must have one parent element */}
				<h1>Hello, {name.toUpperCase()} from React</h1>
				<h2>Oh, and Hi {foo()}, you're local!</h2>
				<h2>I see you {this.fooMethod()} </h2>
			</div>
		);
	}
}

export default App;
