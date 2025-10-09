import Grid from '@mui/material/Grid2';
import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { ProtectedRoute } from './ProtectedRoute';
import { SideBar } from './Sidebar';

const OutletWrapper = styled.div`
	padding: 2rem;
`;

export function Layout(): React.ReactElement {
	return (
		<div className='App'>
			<Grid container spacing={0} style={{ minHeight: '100vh' }}>
				<Grid size={{ xs: 5, md: 3, xl: 2 }}>
					<SideBar />
				</Grid>
				<Grid size={{ xs: 7, md: 9, xl: 10 }}>
					<Header />
					<OutletWrapper>
						<ProtectedRoute />
					</OutletWrapper>
				</Grid>
			</Grid>
		</div>
	);
}
