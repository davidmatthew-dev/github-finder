import React, { Component } from 'react';

class UserItem extends Component {
	constructor() {
		super();
		this.state = {
			id: 'id',
			login: 'DCMatthew',
			avatar_url: 'https://avatars0.githubusercontent.com/u/15695201?v=4',
			html_url: 'https://github.com/DCMatthew',
		};
	}

	render() {
		return (
			<div className="card text-center">
				<img
					src={this.state.avatar_url}
					className="round-img"
					// inline styling
					style={{ width: '60px' }}
					alt="avatar"
				/>
				<h3>{this.state.login}</h3>
				<div>
					<a href={this.state.html_url} className="btn btn-dark btn-sm my-1">
						More
					</a>
				</div>
			</div>
		);
	}
}

export default UserItem;
