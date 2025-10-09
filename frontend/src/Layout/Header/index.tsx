import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PERSONAL_INFO_PAGE_PATH } from '../../Pages/PersonalInfo/Path';
import { useAuth } from '../../Common/Providers/useAuth';

const HeaderWrapper = styled.div`
	padding: 0.92rem;
	display: flex;
	justify-content: end;
`;

const AccountInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	color: #787f89;
	margin-right: 0.75rem;
	&:hover {
		color: #707fdd;
	}
	span {
		margin-left: 0.25rem;
	}
`;

const LogoutWrapper = styled(LogoutRoundedIcon)`
	cursor: pointer;
	color: #787f89;
	&:hover {
		color: #707fdd;
	}
	margin-right: 0.75rem;
`;

export function Header(): React.ReactElement {
	const { logout, user } = useAuth();
	const navigate = useNavigate();

	const handleRedirectToAccount = () => {
		navigate(`/${PERSONAL_INFO_PAGE_PATH}`);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<HeaderWrapper>
				<AccountInfoWrapper onClick={handleRedirectToAccount}>
					<AccountCircleRoundedIcon />
					{user ? <span>{user}</span> : null}
				</AccountInfoWrapper>
				<LogoutWrapper onClick={handleLogout} />
			</HeaderWrapper>
			<Divider />
		</>
	);
}
