import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert }) => {
	const githubContext = useContext(GithubContext);
	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			// takes an optional param to set the timeout of the alert
			setAlert('Please enter details to search', 'light', 3500);
		} else {
			// when submitted, call the props searchUsers
			githubContext.searchUsers(text);
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
			{githubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default Search;
