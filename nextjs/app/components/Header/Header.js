import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../Wrapper';

export const Header = ({ label, className }) => (
	<div className={className}>
		<Wrapper>{label}</Wrapper>
	</div>
);

Header.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string
};

Header.defaultProps = {
	label: 'Header',
	className: ''
};

export default Header;
