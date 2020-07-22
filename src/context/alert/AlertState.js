import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
// this will contain all our actions
const AlertState = (props) => {
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// Set Alert
	// optional time param can be passed
	const setAlert = (msg, type, time = 3000) => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, time },
		});
		// set a timeout for the alert to disappear
		setTimeout(() => dispatch({ type: REMOVE_ALERT }), time);
	};

	return (
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
