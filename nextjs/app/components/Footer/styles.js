import styled from 'styled-components';

export const Footer = Component => styled(Component)`
	background-color: white;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
	display: block;
	color: black;
	font-size: 16px;
	text-align: center;
	position: relative;
	z-index: 10;

	a {
		display: inline-block;
		padding: 10px;
	}
`;

export default Footer;
