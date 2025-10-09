import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../../../Common/Components/Header';
import { useAppDispatch } from '../../../../store';
import { getEmployeeById } from '../../Slice/GetEmployee/Actions';
import { IEmployee } from '../../Slice/Models';
import { Actions } from './Components/Actions';
import { Content } from './Components/Content';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const initialState: Omit<IEmployee, 'id'> = {
	fullName: '',
	email: '',
	salary: 0,
};

export function Modal({ isOpen, onClose }: IProps) {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const employeeId = searchParams.get('employeeId');
	const [formData, setFormData] = useState(initialState);

	React.useEffect(() => {
		if (employeeId) {
			dispatch(getEmployeeById(Number(employeeId)))
				.unwrap()
				.then((employeeData) => setFormData(employeeData));
		}
	}, [employeeId, dispatch]);

	return (
		<Dialog fullWidth maxWidth={'sm'} open={isOpen} onClose={onClose}>
			<DialogTitle>
				<Header>Добавление сотрудника</Header>
			</DialogTitle>
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
			<Content formData={formData} setFormData={setFormData} />
			<Actions formData={formData} onClose={onClose} />
		</Dialog>
	);
}
