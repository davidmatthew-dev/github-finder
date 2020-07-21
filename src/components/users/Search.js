import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			// takes an optional param to set the timeout of the alert
			setAlert('Please enter details to search', 'light', 3500);
		} else {
			// when submitted, call the props searchUsers
			searchUsers(text);
			// clear search box
			setText('');
		}
	};

	// using the event that's passed in, we are getting the value and setting the state. Text is changed to whatever is typed in
	const onChange = (e) => setText(e.target.value);

	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					// onChange required if a value is typed into the input to change the state
					onChange={onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{/* evaluating if showClear is true or false based on what is passed from App.js */}
			{showClear && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;
