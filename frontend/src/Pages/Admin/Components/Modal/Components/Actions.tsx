import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../store';
import { addEmployeeIsLoading } from '../../../Slice/AddEmployee/Selectors';
import { addEmployee, updateEmployee } from '../../../Slice/AddEmployee/Actions';
import { getEmployees } from '../../../Slice/GetEmployees/Actions';
import { IEmployee } from '../../../Slice/Models';
import { useSearchParams } from 'react-router-dom';

interface IProps {
	onClose: () => void;
	formData: Omit<IEmployee, 'id'>;
}

export function Actions({ formData, onClose }: IProps) {
	const dispatch = useAppDispatch();
	const isLoadingPost = useSelector(addEmployeeIsLoading);
	const [searchParams] = useSearchParams();
	const employeeId = searchParams.get('employeeId');

	const handleClick = () => {
		if (employeeId) {
			dispatch(updateEmployee({ id: Number(employeeId), ...formData }))
				.unwrap()
				.then(({ message }) => {
					toast.success(message || 'Сотрудник обновлен!');
					onClose();
					dispatch(getEmployees());
				})
				.catch((error) => {
					toast.error(error);
				});
		} else {
			dispatch(addEmployee(formData))
				.unwrap()
				.then(({ message }) => {
					toast.success(message || 'Сотрудник добавлен!');
					onClose();
					dispatch(getEmployees());
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	};

	return (
		<DialogActions
			sx={{
				m: '0 0.8rem 0.8rem',
			}}
		>
			<Button variant='contained' onClick={handleClick} loading={isLoadingPost}>
				Добавить
			</Button>
			<Button onClick={onClose} variant='text'>
				Отмена
			</Button>
		</DialogActions>
	);
}
