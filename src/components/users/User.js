import React, { useEffect, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ getRepos, repos, match }) => {
	const githubContext = useContext(GithubContext);
	const { getUser, loading, user } = githubContext;
	// we are matching the login param that is passed from the route path for user and now we pass it into the getUser method
	useEffect(() => {
		getUser(match.params.login);
		getRepos(match.params.login);
		// eslint-disable-next-line
	}, []); // add an empty array so this will only run one time

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
	} = user;

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
					<img src={avatar_url} alt='User Avatar' style={{ width: '150px' }} />
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
			<div></div>
			<Repos repos={repos}></Repos>
		</Fragment>
	);
};
User.propTypes = {
	repos: PropTypes.array.isRequired,
	getRepos: PropTypes.func.isRequired,
};
export default User;
