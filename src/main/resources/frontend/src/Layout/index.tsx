import React from 'react';
import Grid from '@mui/material/Grid2';
import { SideBar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const OutletWrapper = styled.div`
	padding: 3rem;
`;

export function Layout(): React.ReactElement {
	return (
		<div className='App'>
			<Grid container spacing={0}>
				<Grid size={{ xs: 5, md: 3 }}>
					<SideBar />
				</Grid>
				<Grid size={{ xs: 7, md: 9 }}>
					<Header />
					<OutletWrapper>
						<Outlet />
					</OutletWrapper>
				</Grid>
			</Grid>
		</div>
	);
}
