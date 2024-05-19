import { injectGlobal } from 'styled-components';

export const boxSizing = injectGlobal`
	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
`;

export default boxSizing;
