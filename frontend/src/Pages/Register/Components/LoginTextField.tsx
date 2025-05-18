import { TextField } from '@mui/material';
import { IRegister } from '../Slice/Models';

interface IProps {
	setFormData: React.Dispatch<React.SetStateAction<IRegister>>;
}

export function LoginTextField({ setFormData }: IProps) {
	const handleChangeValueLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			login: event.target.value,
		}));
	};

	return <TextField fullWidth id='standard-basic' label='Логин' variant='outlined' margin='dense' onChange={handleChangeValueLogin} />;
}
