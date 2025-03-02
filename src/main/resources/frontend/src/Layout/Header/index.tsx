import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const HeaderWrapper = styled.div`
	padding: 0.84rem;
	display: flex;
	justify-content: end;
	svg {
		cursor: pointer;
		color: #787f89;
		&:hover {
			color: #707fdd;
		}
	}
`;

export function Header(): React.ReactElement {
	return (
		<>
			<HeaderWrapper>
				<NotificationsRoundedIcon />
			</HeaderWrapper>
			<Divider />
		</>
	);
}
