import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import Footer from '../../Footer';
import stickyVerticalLayout from '../../../styles/sticky-vertical-layout';

const { Wrapper, Main } = stickyVerticalLayout();

export const Layout = ({ className, children }) => (
	<Wrapper>
		<Header label="Hello, Next.js!" />
		<Main className={className}>{children}</Main>
		<Footer
			href="https://github.com/stephencorwin/nextjs-hello-world"
			label="stephencorwin/nextjs-hello-world"
		/>
	</Wrapper>
);

Layout.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};

Layout.defaultProps = {
	className: '',
	children: undefined
};

export default Layout;
