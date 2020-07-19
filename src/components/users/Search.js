import React, { Component } from 'react';

class Search extends Component {
	state = {
		text: '',
	};

	// using the event that's passed in, we are getting the value and setting the state. Text is changed to whatever is typed in
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });
	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.text);
	};
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form'>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
						value={this.state.text}
						// onChange required if a value is typed into the input to change the state
						onChange={this.onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
			</div>
		);
	}
}

export default Search;
