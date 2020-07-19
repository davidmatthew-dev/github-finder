import React from 'react';
import PropTypes from 'prop-types';

// destructure props
const Navbar = ({ icon, title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon}> {title}</i>
			</h1>
		</nav>
	);
};

// set default props in a functional component
Navbar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};
export default Navbar;
