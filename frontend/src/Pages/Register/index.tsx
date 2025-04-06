import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styled from 'styled-components';
import { PasswordTextField } from '../../Common/PasswordTextField';

const Item = styled.div`
	text-align: center;
	height: 366px;
	width: 40%;
	margin: 8rem auto;
	background-color: #f1f2f7;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.12);
	padding: 2rem;
	justify-content: space-between;
`;

const StyledButton = styled(Button)(() => ({
	marginTop: '2rem',
}));

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && children}
		</div>
	);
}

export function Register() {
	const [loading, setLoading] = useState(false);
	function handleClick() {
		setLoading(true);
	}

	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	return (
		<>
			<Item>
				<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
					<Tab label='Войти' {...a11yProps(0)} />
					<Tab label='Регистрация' {...a11yProps(1)} />
				</Tabs>
				<div>
					<CustomTabPanel value={value} index={0}>
						<TextField fullWidth id='standard-basic' label='Логин' variant='outlined' margin='dense' />
						<PasswordTextField label='Пароль' />
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<TextField fullWidth id='standard-basic' label='Логин' variant='outlined' margin='dense' />
						<PasswordTextField label='Пароль' />
						<PasswordTextField label='Повторите пароль' />
					</CustomTabPanel>
				</div>
				<StyledButton variant='contained' size='large' loading={loading} onClick={handleClick}>
					Создать аккаунт
				</StyledButton>
			</Item>
		</>
	);
}
