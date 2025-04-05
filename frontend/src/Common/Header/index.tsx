import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 1rem 2.4rem;
	color: #5a67ba;
	font-weight: 600;
	font-size: 18px;
`;

interface IProps {
	children: React.ReactNode;
}

export function Header({ children }: IProps): React.ReactElement {
	return <Wrapper>{children}</Wrapper>;
}
