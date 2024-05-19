import styled, { injectGlobal } from 'styled-components';

export const stickyVerticalLayout = injectGlobal`
	html {
		overflow: hidden;
	}

	html,
	body,
	#__next {
		height: 100%;
	}
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
	height: 100%;
	min-height: 100vh;
`;

export const Main = styled.main`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	padding: 0 10px;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const StickyVerticalLayout = () => ({ Wrapper, Main });

export default StickyVerticalLayout;
