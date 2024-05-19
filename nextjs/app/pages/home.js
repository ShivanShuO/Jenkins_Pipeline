import React from 'react';
import PropTypes from 'prop-types';
import Home from '../components/Layouts/Home';

export const HomePage = ({ className }) => <Home className={className} />;

HomePage.propTypes = {
	className: PropTypes.string
};

HomePage.defaultProps = {
	className: ''
};

export default HomePage;
