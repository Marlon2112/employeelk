import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import { employeeActionIsLoading } from '../../../Slice/AddEmployee/Selectors';

interface IProps {
	onClose: () => void;
}

export function Actions({ onClose }: IProps) {
	const isLoadingPost = useSelector(employeeActionIsLoading);

	return (
		<DialogActions
			sx={{
				m: '1rem 0 0 ',
			}}
		>
			<Button variant='contained' loading={isLoadingPost} type='submit'>
				Добавить
			</Button>
			<Button onClick={onClose} variant='text'>
				Отмена
			</Button>
		</DialogActions>
	);
}
