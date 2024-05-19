import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import boxSizing from '../box-sizing';
import stickyVerticalLayout from '../sticky-vertical-layout';

export const globalStyles = () => injectGlobal`
	${styledNormalize}
	${boxSizing}
	${stickyVerticalLayout}

	html {
		background-color: #eeeeee;
		font-family: roboto;
	}
`;

export default globalStyles;
