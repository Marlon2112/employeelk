import React from 'react';
import { MenuItem } from './Components/MenuItem';
import { Header } from '../../Common/Header';
import { MENU_ITEMS } from './Config';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0.3rem 1rem;
`;

const Wrapper = styled.div`
	background-color: #f1f2f7;
	height: 100vh;
	color: #c4c7db;
	margin: 0;
	padding: 0;
`;

const MenuHeader = styled.div`
	margin-left: 2.4rem;
	margin-top: 2rem;
`;

export function SideBar(): React.ReactElement {
	return (
		<Wrapper>
			<Header>Employee Office</Header>
			<Divider />
			<MenuHeader>МЕНЮ</MenuHeader>
			<List>
				{MENU_ITEMS.map((item) => (
					<MenuItem title={item.title} link={item.link} key={item.id} icon={item.icon} />
				))}
			</List>
		</Wrapper>
	);
}
