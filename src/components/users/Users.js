import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
	// setting state with an array of users
	state = {
		users: [
			{
				id: '15695201',
				login: 'DCMatthew',
				avatar_url: 'https://avatars0.githubusercontent.com/u/15695201?v=4',
				html_url: 'https://github.com/DCMatthew',
			},
			{
				id: '1',
				login: 'mojombo',
				avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
				html_url: 'https://github.com/mojombo',
			},
			{
				id: '2',
				login: 'defunkt',
				avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
				html_url: 'https://github.com/defunkt',
			},
		],
	};

	render() {
		return (
			<div style={userStyle}>
				{this.state.users.map((user) => (
					//each item should have a unique key property and we are also sending out the user property to be used in UserItem
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
