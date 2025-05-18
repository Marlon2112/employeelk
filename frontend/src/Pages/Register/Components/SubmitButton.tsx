import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginIsLoading } from '../Slice/Selectors';

interface IProps {
	tabValue: number;
	handleClick: () => void;
}

const StyledButton = styled(Button)(() => ({
	marginTop: '2rem',
}));

export function SubmitButton({ tabValue, handleClick }: IProps) {
	const isLoading = useSelector(loginIsLoading);

	return (
		<StyledButton variant='contained' size='large' loading={isLoading} onClick={handleClick}>
			{tabValue === 0 ? 'Войти' : 'Создать аккаунт'}
		</StyledButton>
	);
}
