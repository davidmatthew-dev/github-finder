import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);

	const { loading, users } = githubContext;

	if (loading) {
		// Add spinner while data loads
		return <Spinner />;
	} else {
		return (
			<div style={userStyle}>
				{/* now we are getting the users from Github's API */}
				{users.map((user) => (
					// each item should have a unique key property and we are also sending out the user property to be used in UserItem
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

// setup component styles
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

export default Users;
