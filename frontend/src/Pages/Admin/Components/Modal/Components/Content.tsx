import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../../../../Common/Components/Loader';
import { useAppDispatch } from '../../../../../store';
import { addEmployee, updateEmployee } from '../../../Slice/AddEmployee/Actions';
import { getEmployeeById } from '../../../Slice/GetEmployee/Actions';
import { getEmployeeDataIsLoading } from '../../../Slice/GetEmployee/Selectors';
import { getEmployees } from '../../../Slice/GetEmployees/Actions';
import { FormValues, validationSchema } from '../Validator';
import { Actions } from './Actions';

interface IProps {
	onClose: () => void;
	isOpen: boolean;
}

const initialState: FormValues = {
	fullName: '',
	email: '',
	salary: 0,
};

export function Content({ onClose, isOpen }: IProps) {
	const isLoadingGet = useSelector(getEmployeeDataIsLoading);
	const [searchParams] = useSearchParams();
	const employeeId = searchParams.get('employeeId');
	const dispatch = useAppDispatch();

	const formData = useForm<FormValues>({
		defaultValues: initialState,
		mode: 'onChange',
		resolver: zodResolver(validationSchema),
	});

	const { handleSubmit, control, reset } = formData;

	useEffect(() => {
		if (employeeId) {
			dispatch(getEmployeeById(Number(employeeId)))
				.unwrap()
				.then((employeeData) => reset(employeeData));
		} else {
			reset(initialState);
		}
	}, [employeeId, dispatch, isOpen]);

	const submitHandler = async (formValues: FormValues) => {
		if (employeeId) {
			dispatch(updateEmployee({ id: Number(employeeId), ...formValues }))
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
			dispatch(addEmployee(formValues))
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

	return employeeId && isLoadingGet ? (
		<Loader />
	) : (
		<FormProvider {...formData}>
			<DialogContent>
				<Box
					noValidate
					component='form'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						m: '0 1rem',
						minHeight: '200px',
						justifyContent: 'space-around',
					}}
					onSubmit={handleSubmit(submitHandler)}
				>
					<Controller
						name='fullName'
						control={control}
						render={({ field, fieldState }) => (
							<TextField {...field} label='ФИО' variant='outlined' fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} margin='dense' />
						)}
					/>

					<Controller
						name='email'
						control={control}
						render={({ field, fieldState }) => (
							<TextField {...field} label='Email' variant='outlined' fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} margin='dense' />
						)}
					/>

					<Controller
						name='salary'
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								onChange={(e) => {
									const value = e.target.value;
									const numericValue = value.replace(/[^\d]/g, '');
									field.onChange(numericValue === '' ? '' : Number(numericValue));
								}}
								label='Оклад'
								variant='outlined'
								fullWidth
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								margin='dense'
								slotProps={{
									input: {
										endAdornment: <InputAdornment position='start'>₽</InputAdornment>,
									},
								}}
							/>
						)}
					/>
					<Actions onClose={onClose} />
				</Box>
			</DialogContent>
		</FormProvider>
	);
}
