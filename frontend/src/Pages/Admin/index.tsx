import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../../Common/Components/Header';
import { useAppDispatch } from '../../store';
import { Modal } from './Components/Modal';
import { TableEmployees } from './Components/Table';
import { getEmployees } from './Slice/GetEmployees/Actions';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export function Admin() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClickOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
		navigate('.');
	};

	React.useEffect(() => {
		dispatch(getEmployees());
	}, []);

	return (
		<>
			<Wrapper>
				<Header>Панель администратора</Header>
				<div>
					<Button variant='contained' startIcon={<AddIcon />} onClick={handleClickOpen}>
						Добавить сотрудника
					</Button>
				</div>
			</Wrapper>
			<TableEmployees onModalOpen={handleClickOpen} />
			<Modal isOpen={isOpen} onClose={handleClose} />
		</>
	);
}
