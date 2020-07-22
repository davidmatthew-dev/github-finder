import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';
// this will contain all our actions
const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = async (text) => {
		setLoading();
		const { usersURI } = httpReq(text);
		const res = await axios.get(usersURI);
		// dispatch to the reducer
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Get User
	const getUser = async (user) => {
		setLoading();
		const { userURI } = httpReq(user);
		const res = await axios.get(userURI);
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	// Get Repos
	const getRepos = async (user) => {
		setLoading();
		const { userRepoURI } = httpReq(user, 5);
		const res = await axios.get(userRepoURI);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading

	// define parts of the http request
	const httpReq = (data, per_page = 5, sort = 'created:asc') => {
		const ghclientid = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
		const ghclientsecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const usersURI = `https://api.github.com/search/users?q=${data}&${ghclientid}&${ghclientsecret}`;
		const userURI = `https://api.github.com/users/${data}?${ghclientid}&${ghclientsecret}`;
		const userRepoURI = `https://api.github.com/users/${data}/repos?per_page=${per_page}&sort=${sort}&${ghclientid}&${ghclientsecret}`;

		return { usersURI, userURI, userRepoURI };
	};

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
