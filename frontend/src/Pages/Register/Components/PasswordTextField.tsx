import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import styled from 'styled-components';
import { IRegister } from '../Slice/Models';

interface IProps {
	label: string;
	setFormData?: React.Dispatch<React.SetStateAction<IRegister>>;
	value: 'password' | 'checkPassword';
	errorText?: string;
}

const StyledHelperText = styled.p(() => ({
	color: '#d32f2f',
	textAlign: 'left',
	marginTop: '5px',
	letterSpacing: '0.03333em',
	fontSize: '0.75rem',
}));

export function PasswordTextField({ label, setFormData, value, errorText }: IProps) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleChangeValuePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData?.((prev) => ({
			...prev,
			[value]: event.target.value,
		}));
	};

	return (
		<FormControl variant='outlined' fullWidth margin='normal'>
			<InputLabel htmlFor={`outlined-adornment-password-${value}`}>{label}</InputLabel>
			<OutlinedInput
				id={`outlined-adornment-password-${value}`}
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'} onClick={handleClickShowPassword} edge='end'>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
				onChange={handleChangeValuePassword}
				error={Boolean(errorText)}
			/>
			{value === 'checkPassword' && <StyledHelperText>{errorText}</StyledHelperText>}
		</FormControl>
	);
}
