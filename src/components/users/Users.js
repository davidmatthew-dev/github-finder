import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner.js';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
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

// define prop types
Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

// setup component styles
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

export default Users;
