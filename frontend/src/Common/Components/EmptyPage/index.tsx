import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import styled from 'styled-components';

const Wrapper = styled.div`
	flex-direction: column;
	justify-content: center;
	display: flex;
	margin: 12vh;
	align-items: center;
`;

const StyledLabel = styled.span`
	margin: 8px;
	color: #787f8945;
	font-weight: 500;
`;

export function EmptyPage() {
	return (
		<Wrapper>
			<SentimentVeryDissatisfiedOutlinedIcon style={{ color: '#787f8945', fontSize: '110px' }} />
			<StyledLabel>Список пуст...</StyledLabel>
		</Wrapper>
	);
}
