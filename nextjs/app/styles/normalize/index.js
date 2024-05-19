import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

export const normalize = () => injectGlobal`
	${styledNormalize}
`;

export default normalize;
