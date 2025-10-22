import AccountCircle from '@mui/icons-material/AccountCircle';
import AdminPanel from '@mui/icons-material/AdminPanelSettings';
import LightMode from '@mui/icons-material/LightMode';
import TrendingUp from '@mui/icons-material/TrendingUp';
import React from 'react';
import { ADMIN_PAGE_PATH } from '../../Pages/Admin/Path';
import { CAREER_ROUTES_PAGE_PATH } from '../../Pages/CareerRoutes/Path';
import { PERSONAL_INFO_PAGE_PATH } from '../../Pages/PersonalInfo/Path';
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
		title: 'Карьерные маршруты',
		link: CAREER_ROUTES_PAGE_PATH,
		id: '3',
		icon: <TrendingUp />,
	},
	{
		title: 'Админ панель',
		link: ADMIN_PAGE_PATH,
		id: '4',
		icon: <AdminPanel />,
	},
];
