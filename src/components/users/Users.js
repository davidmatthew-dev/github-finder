import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
	render() {
		return (
			<div style={userStyle}>
				{/* now we are getting the users from Github's API */}
				{this.props.users.map((user) => (
					// each item should have a unique key property and we are also sending out the user property to be used in UserItem
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
}

// setup component styles
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

export default Users;
