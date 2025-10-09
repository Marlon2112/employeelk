import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LightMode from '@mui/icons-material/LightMode';
import Coronavirus from '@mui/icons-material/Coronavirus';
import AdminPanel from '@mui/icons-material/AdminPanelSettings';
import { PERSONAL_INFO_PAGE_PATH } from '../../Pages/PersonalInfo/Path';
import { ADMIN_PAGE_PATH } from '../../Pages/Admin/Path';
import { SICK_LEAVE_PAGE_PATH } from '../../Pages/SickLeave/Path';
import { VACATION_PAGE_PATH } from '../../Pages/Vacation/Path';

interface IMenuItems {
	title: string;
	link: string;
	id: string;
	icon?: React.ReactElement;
}

export const MENU_ITEMS: IMenuItems[] = [
	{
		title: 'Личный кабинет',
		link: PERSONAL_INFO_PAGE_PATH,
		id: '1',
		icon: <AccountCircle />,
	},
	{
		title: 'Отпуск',
		link: VACATION_PAGE_PATH,
		id: '2',
		icon: <LightMode />,
	},
	{
		title: 'Больничный',
		link: SICK_LEAVE_PAGE_PATH,
		id: '3',
		icon: <Coronavirus />,
	},
	{
		title: 'Админ панель',
		link: ADMIN_PAGE_PATH,
		id: '4',
		icon: <AdminPanel />,
	},
];
