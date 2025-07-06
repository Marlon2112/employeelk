import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 1rem 2rem;
	color: #42464c;
	font-weight: 600;
	font-size: 18px;
	display: inline;
`;

interface IProps {
	children: React.ReactNode;
}

export function Header({ children }: IProps): React.ReactElement {
	return <Wrapper>{children}</Wrapper>;
}
