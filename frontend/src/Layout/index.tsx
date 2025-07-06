import React from 'react';
import Grid from '@mui/material/Grid2';
import { SideBar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const OutletWrapper = styled.div`
	padding: 2rem;
`;

export function Layout(): React.ReactElement {
	return (
		<div className='App'>
			<Grid container spacing={0}>
				<Grid size={{ xs: 5, md: 3, xl: 2 }}>
					<SideBar />
				</Grid>
				<Grid size={{ xs: 7, md: 9, xl: 10 }}>
					<Header />
					<OutletWrapper>
						<Outlet />
					</OutletWrapper>
				</Grid>
			</Grid>
		</div>
	);
}
