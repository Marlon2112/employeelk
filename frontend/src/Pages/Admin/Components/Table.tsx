import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Loader } from '../../../Common/Loader';
import { getEmployeesData, getEmployeesIsLoading } from '../Slice/GetEmployees/Selectors';

const IconsWrapper = styled.div`
	svg {
		cursor: pointer;
		color: #787f89;
		&:hover {
			color: #707fdd;
		}
	}
`;

export function TableEmployees() {
	const employees = useSelector(getEmployeesData);
	const isLoading = useSelector(getEmployeesIsLoading);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<TableContainer
			component={Paper}
			sx={{
				m: '2rem 0',
			}}
		>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow>
						<TableCell>ФИО</TableCell>
						<TableCell>Email</TableCell>
						<TableCell style={{ width: 70 }} />
					</TableRow>
				</TableHead>
				<TableBody>
					{employees &&
						employees.map((row) => (
							<TableRow key={row.name} sx={{ '& > *': { borderBottom: 'unset' } }}>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>
									<IconsWrapper>
										<IconButton aria-label='expand row' size='small'>
											<ModeEditIcon />
										</IconButton>
										<IconButton aria-label='expand row' size='small'>
											<DeleteIcon />
										</IconButton>
									</IconsWrapper>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
