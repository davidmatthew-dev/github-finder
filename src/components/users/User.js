import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class User extends Component {
	// this will trigger when the component loads
	componentDidMount() {
		// we are matching the login param that is passed from the route path for user and now we pass it into the getUser method
		this.props.getUser(this.props.match.params.login);
	}

	static propTypes = {
		loading: PropTypes.bool,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired,
	};
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
			company,
		} = this.props.user;

		const { loading } = this.props;
		// Bring up the spinner if the profile is loading
		if (loading) return <Spinner />;

		return (
			<Fragment>
				{/* back to search button */}
				<Link to='/' className='btn btn-light'>
					Back to Search
				</Link>
				{/* icon to show if the person is hireable */}
				Hireable:{' '}
				{hireable ? (
					<i className='fas fa-check text-success' />
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						{/* Avatar */}
						<img
							src={avatar_url}
							alt='User Avatar'
							style={{ width: '150px' }}
						/>
						{/* Name */}
						<h1>{name}</h1>
						{/* Location */}
						<p>Location: {location}</p>
					</div>
					<div>
						{/* Bio will display only if the user has one */}
						{bio && (
							<Fragment>
								<h3>Bio</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						{/* Link to Github Profile */}
						<a href={html_url} className='btn btn-dark my-1'>
							Visit Github Profile
						</a>
						{/* List of username, company and website */}
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username: </strong>
										{login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company: </strong>
										{company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website: </strong>
										{blog}
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				{/* section for statistics */}
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers: {followers}</div>
					<div className='badge badge-success'>Following: {following}</div>
					<div className='badge badge-light'>Public Repos: {public_repos}</div>
					<div className='badge badge-dark'>Public Gists: {public_gists}</div>
				</div>
			</Fragment>
		);
	}
}

export default User;
