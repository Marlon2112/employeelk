import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import styled from 'styled-components';
import { PasswordTextField } from '../../Common/PasswordTextField';
import { useAppDispatch } from '../../store';
import { LoginTextField } from './Components/LoginTextField';
import { SubmitButton } from './Components/SubmitButton';
import { TabPanel } from './Components/TabPanel';
import { login } from './Slice/Actions';
import { IRegister } from './Slice/Models';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Item = styled.div`
	text-align: center;
	height: 366px;
	width: 32%;
	margin: 8rem auto;
	background-color: #f1f2f7;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.12);
	padding: 2rem;
	justify-content: space-between;
`;

const initialState: IRegister = {
	login: '',
	password: '',
	checkPassword: '',
};

export function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<IRegister>(initialState);
	const [errorText, setErrorText] = useState('');

	const [tabValue, setTabValue] = useState(0);

	const handleChangeTabs = (_: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		setFormData(initialState);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const handleClick = () => {
		if (formData.password !== formData.checkPassword && tabValue === 1) {
			setErrorText('Пароли не совпадают');
		} else {
			setErrorText('');
			dispatch(login(formData))
				.unwrap()
				.then(() => {
					navigate('/personalInfo');
					toast.success('Авторизация успешна!');
				})
				.catch((error) => {
					toast.error(error || 'Ошибка авторизации');
				});
		}
	};

	return (
		<>
			<Item>
				<Tabs value={tabValue} onChange={handleChangeTabs} aria-label='basic tabs example'>
					<Tab label='Войти' {...a11yProps(0)} />
					<Tab label='Регистрация' {...a11yProps(1)} />
				</Tabs>
				<div>
					<TabPanel value={tabValue} index={0}>
						<LoginTextField setFormData={setFormData} />
						<PasswordTextField label='Пароль' setFormData={setFormData} value='password' />
					</TabPanel>
					<TabPanel value={tabValue} index={1}>
						<LoginTextField setFormData={setFormData} />
						<PasswordTextField label='Пароль' setFormData={setFormData} value='password' errorText={errorText} />
						<PasswordTextField label='Повторите пароль' value='checkPassword' errorText={errorText} setFormData={setFormData} />
					</TabPanel>
				</div>
				<SubmitButton tabValue={tabValue} handleClick={handleClick} />
			</Item>
		</>
	);
}
