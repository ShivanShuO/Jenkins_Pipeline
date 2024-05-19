import styled from 'styled-components';

export const Header = Component => styled(Component)`
	background-color: white;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
	color: black;
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	padding: 10px 0;
	position: relative;
	z-index: 10;
`;

export default Header;
