import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../../Common/Components/Header';
import { useAppDispatch } from '../../store';
import { PERSONAL_INFO_PAGE_PATH } from '../PersonalInfo/Path';
import { LoginTextField } from './Components/LoginTextField';
import { PasswordTextField } from './Components/PasswordTextField';
import { SubmitButton } from './Components/SubmitButton';
import { loginAction } from './Slice/Actions';
import { IRegister } from './Slice/Models';
import { useAuth } from '../../Common/Providers/useAuth';

const Item = styled.div`
	text-align: center;
	height: 300px;
	width: 380px;
	margin: 8rem auto;
	background-color: #f1f2f7;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	padding: 2rem 4rem;
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
	const { login } = useAuth();

	const handleClick = () => {
		dispatch(loginAction(formData))
			.unwrap()
			.then(({ message, userName, token }) => {
				login(token, userName);
				navigate(`/${PERSONAL_INFO_PAGE_PATH}`);
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
