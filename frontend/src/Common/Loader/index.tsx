import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

const Wrapper = styled.div`
	justify-content: center;
	display: flex;
	margin: 23vh;
`;

export function Loader() {
	return (
		<Wrapper>
			<MoonLoader color='#707fdd' />
		</Wrapper>
	);
}
