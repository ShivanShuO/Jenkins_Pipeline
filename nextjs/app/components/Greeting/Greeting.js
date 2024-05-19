import React from 'react';
import PropTypes from 'prop-types';

export const Greeting = ({ message, className }) => <div className={className}>{message}</div>;

Greeting.propTypes = {
	message: PropTypes.string,
	className: PropTypes.string
};

Greeting.defaultProps = {
	message: 'Hello World!',
	className: ''
};

export default Greeting;
