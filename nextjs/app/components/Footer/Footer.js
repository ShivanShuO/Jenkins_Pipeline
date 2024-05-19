import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../Wrapper';

export const Footer = ({ href, label, className }) => (
	<div className={className}>
		<Wrapper>
			<a href={href} target="_blank" rel="noopener noreferrer" title={label}>
				{label}
			</a>
		</Wrapper>
	</div>
);

Footer.propTypes = {
	href: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string
};

Footer.defaultProps = {
	href: '/',
	label: 'Footer',
	className: ''
};

export default Footer;
