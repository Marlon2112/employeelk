import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deleteEmployee } from '../../../Slice/AddEmployee/Actions';
import { useAppDispatch } from '../../../../../store';
import { useSelector } from 'react-redux';
import { employeeActionIsLoading } from '../../../Slice/AddEmployee/Selectors';
import toast from 'react-hot-toast';
import { getEmployees } from '../../../Slice/GetEmployees/Actions';

interface IProps {
	setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
	openDeleteDialog: boolean;
}

export function DeleteDialog({ setOpenDeleteDialog, openDeleteDialog }: IProps) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const employeeId = searchParams.get('employeeId');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(employeeActionIsLoading);

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
		navigate('.');
	};

	const handleDelete = () => {
		if (employeeId) {
			dispatch(deleteEmployee(Number(employeeId)))
				.unwrap()
				.then(({ message }) => {
					toast.success(message || 'Сотрудник удален!');
					setOpenDeleteDialog(false);
					dispatch(getEmployees());
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	};

	return (
		<Dialog maxWidth={'xs'} open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>Подтверждение удаления</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Вы уверены, что хотите удалить этот элемент? <br />
					Это действие невозможно отменить.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleDelete} loading={isLoading}>
					Удалить
				</Button>
				<Button onClick={handleCloseDeleteDialog} autoFocus>
					Отмена
				</Button>
			</DialogActions>
		</Dialog>
	);
}
