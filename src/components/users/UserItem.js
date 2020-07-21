import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// destructure during the creation of the function
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				className='round-img'
				// inline styling
				style={{ width: '60px' }}
				alt='avatar'
			/>
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
					More
				</Link>
			</div>
		</div>
	);
};

// remember propTypes is case sensitive
UserItem.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserItem;
