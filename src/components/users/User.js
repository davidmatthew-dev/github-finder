import React, { Component } from 'react';

class User extends Component {
	// this will trigger when the component loads
	componentDidMount() {
		// we are matching the login param that is passed from the route path for user and now we pass it into the getUser method
		this.props.getUser(this.props.match.params.login);
	}
	render() {
		// destructure data we need from props.user
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user;

		const { loading } = this.props;
		return <div>{bio}</div>;
	}
}

export default User;
