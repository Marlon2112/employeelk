import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { l } from 'react-router/dist/development/fog-of-war-CCAcUMgB';

interface IProps {
	label: string;
}

export function PasswordTextField({ label }: IProps) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<FormControl variant='outlined' fullWidth margin='normal'>
			<InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
			<OutlinedInput
				id='outlined-adornment-password'
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'} onClick={handleClickShowPassword} edge='end'>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>
		</FormControl>
	);
}
