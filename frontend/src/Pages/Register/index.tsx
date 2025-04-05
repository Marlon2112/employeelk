import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../Common/Header';

const Item = styled.div`
	text-align: center;
	height: 300px;
	width: 40%;
	margin: 8rem auto;
	background-color: #f1f2f7;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.12);
	padding: 2rem;
	justify-content: space-between;
`;

const StyledButton = styled(Button)(() => ({
	marginTop: '2rem',
}));

export function Register() {
	const [loading, setLoading] = useState(false);
	function handleClick() {
		setLoading(true);
	}

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<>
			<Item>
				<Header>Регистрация</Header>
				<div>
					<TextField fullWidth id='standard-basic' label='Логин' variant='outlined' margin='dense' />
					<FormControl variant='outlined' fullWidth margin='normal'>
						<InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password'
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton aria-label={showPassword ? 'hide the password' : 'display the password'} onClick={handleClickShowPassword} edge='end'>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
						/>
					</FormControl>
				</div>
				<StyledButton variant='contained' size='large' loading={loading} onClick={handleClick}>
					Создать аккаунт
				</StyledButton>
			</Item>
		</>
	);
}
