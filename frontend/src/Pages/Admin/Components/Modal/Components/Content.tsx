import { InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../../../../Common/Loader';
import { getEmployeeDataIsLoading } from '../../../Slice/GetEmployee/Selectors';
import { IEmployee } from '../../../Slice/Models';

interface IProps {
	formData: Omit<IEmployee, 'id'>;
	setFormData: React.Dispatch<React.SetStateAction<Omit<IEmployee, 'id'>>>;
}

export function Content({ setFormData, formData }: IProps) {
	const isLoadingGet = useSelector(getEmployeeDataIsLoading);
	const [searchParams] = useSearchParams();
	const employeeId = searchParams.get('employeeId');

	const handleChangeValue = (field: keyof IEmployee) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	const handleChangeSalaryValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		if (inputValue === '' || /^\d+$/.test(inputValue)) {
			setFormData((prev) => ({
				...prev,
				salary: Number(event.target.value),
			}));
		}
	};

	return employeeId && isLoadingGet ? (
		<Loader />
	) : (
		<DialogContent>
			<Box
				noValidate
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					m: '0.5rem 1rem',
					minHeight: '200px',
					justifyContent: 'space-around',
				}}
			>
				<TextField fullWidth label='ФИО' variant='outlined' onChange={handleChangeValue('fullName')} margin='dense' value={formData.fullName} />
				<TextField fullWidth label='Email' variant='outlined' onChange={handleChangeValue('email')} margin='dense' value={formData.email} />
				{/* TODO: добавить валидациию на цифры */}
				<TextField
					fullWidth
					label='Оклад'
					variant='outlined'
					onChange={handleChangeSalaryValue}
					margin='dense'
					value={formData.salary}
					slotProps={{
						input: {
							endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
						},
					}}
				/>
			</Box>
		</DialogContent>
	);
}
