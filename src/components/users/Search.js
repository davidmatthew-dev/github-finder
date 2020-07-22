import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const [text, setText] = useState('');
	const { searchUsers, users, clearUsers } = githubContext;
	const { setAlert } = alertContext;

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			// takes an optional param to set the timeout of the alert
			setAlert('Please enter details to search', 'light', 3500);
		} else {
			// pass the text to searchUsers
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
			{users.length > 0 && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
