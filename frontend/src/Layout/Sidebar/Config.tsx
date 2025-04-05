import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LightMode from '@mui/icons-material/LightMode';
import Coronavirus from '@mui/icons-material/Coronavirus';
import AdminPanel from '@mui/icons-material/AdminPanelSettings';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

interface IMenuItems {
	title: string;
	link: string;
	id: string;
	icon?: React.ReactElement;
}

export const MENU_ITEMS: IMenuItems[] = [
	{
		title: 'Личный кабинет',
		link: 'personalInfo',
		id: '1',
		icon: <AccountCircle />,
	},
	{
		title: 'Отпуск',
		link: 'vacation',
		id: '2',
		icon: <LightMode />,
	},
	{
		title: 'Больничный',
		link: 'sickLeave',
		id: '3',
		icon: <Coronavirus />,
	},
	{
		title: 'Админ панель',
		link: 'admin',
		id: '4',
		icon: <AdminPanel />,
	},
	{
		title: 'Регистрация',
		link: 'register',
		id: '5',
		icon: <HowToRegRoundedIcon />,
	},
];
