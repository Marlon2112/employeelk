import { useState } from 'react';
import styled from 'styled-components';
import { PasswordTextField } from './Components/PasswordTextField';
import { useAppDispatch } from '../../store';
import { LoginTextField } from './Components/LoginTextField';
import { SubmitButton } from './Components/SubmitButton';
import { login } from './Slice/Actions';
import { IRegister } from './Slice/Models';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Common/Header';

const Item = styled.div`
	text-align: center;
	height: 300px;
	width: 30%;
	margin: 8rem auto;
	background-color: #f1f2f7;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	padding: 2rem 3rem;
	justify-content: space-between;
`;

const initialState: IRegister = {
	login: '',
	password: '',
};

export function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<IRegister>(initialState);

	const handleClick = () => {
		dispatch(login(formData))
			.unwrap()
			.then((message) => {
				navigate('/personalInfo');
				toast.success(message || 'Авторизация успешна!');
			})
			.catch((error) => {
				toast.error(error || 'Ошибка авторизации');
			});
	};

	return (
		<>
			<Item>
				<Header>Войти</Header>
				<div>
					<LoginTextField setFormData={setFormData} />
					<PasswordTextField label='Пароль' setFormData={setFormData} value='password' />
				</div>
				<SubmitButton handleClick={handleClick} />
			</Item>
		</>
	);
}
