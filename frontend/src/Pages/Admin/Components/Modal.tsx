import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { addEmployee } from '../Slice/AddEmployee/Actions';
import { IEmployee } from '../Slice/AddEmployee/Models';
import { useState } from 'react';
import { useAppDispatch } from '../../../store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { addEmployeeIsLoading } from '../Slice/AddEmployee/Selectors';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const initialState: IEmployee = {
	name: '',
	email: '',
};

export function Modal({ isOpen, onClose }: IProps) {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<IEmployee>(initialState);
	const isLoading = useSelector(addEmployeeIsLoading);

	const handleClick = () => {
		dispatch(addEmployee(formData))
			.unwrap()
			.then(() => {
				toast.success('Сотрудник добавлен!');
				onClose();
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleChangeValueName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			name: event.target.value,
		}));
	};

	const handleChangeValueEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			email: event.target.value,
		}));
	};

	return (
		<Dialog fullWidth maxWidth={'sm'} open={isOpen} onClose={onClose}>
			<DialogTitle>Добавление сотрудника</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={onClose}
				sx={(theme) => ({
					position: 'absolute',
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent>
				<Box
					noValidate
					component='form'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						m: '1rem',
						minHeight: '150px',
						justifyContent: 'space-around',
					}}
				>
					<TextField fullWidth id='standard-basic' label='ФИО' variant='outlined' onChange={handleChangeValueName} />
					<TextField fullWidth id='standard-basic' label='Email' variant='outlined' onChange={handleChangeValueEmail} />
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					m: '0 0.8rem 0.8rem',
				}}
			>
				<Button variant='contained' onClick={handleClick} loading={isLoading}>
					Добавить
				</Button>
				<Button onClick={onClose} variant='text'>
					Отмена
				</Button>
			</DialogActions>
		</Dialog>
	);
}
