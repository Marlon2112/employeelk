import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
	title: string;
	link: string;
	icon?: React.ReactElement;
}

const Wrapper = styled.li`
	padding: 0.9rem 1.5rem;
	cursor: pointer;
	border-radius: 10px;
	display: flex;
	align-items: center;
	&:hover {
		background: #e4e7f5;
		span,
		svg {
			color: #707fdd;
		}
	}
	span {
		margin-left: 5px;
	}
	&.active {
		background: #e4e7f5;
		color: #707fdd;
	}
`;
const LinkWrapper = styled(Link)`
	text-decoration: none;
	color: #787f89;
`;

export function MenuItem({ title, link, icon }: IProps): React.ReactElement {
	const location = useLocation();
	const isActive = location.pathname.includes(`/${link}`);

	return (
		<LinkWrapper to={`/${link}`}>
			<Wrapper className={isActive ? 'active' : ''}>
				{icon}
				<span>{title}</span>
			</Wrapper>
		</LinkWrapper>
	);
}
