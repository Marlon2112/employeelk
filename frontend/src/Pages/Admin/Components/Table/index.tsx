import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Loader } from '../../../../Common/Loader';
import { getEmployeesData, getEmployeesIsLoading } from '../../Slice/GetEmployees/Selectors';
import { DeleteDialog } from './Components/DeleteDialog';
import { TableHeader } from './Components/TableHeader';
import { EmptyPage } from '../../../../Common/EmptyPage';

const IconsWrapper = styled.div`
	svg {
		cursor: pointer;
		color: #787f89;
		&:hover {
			color: #707fdd;
		}
	}
`;

interface IProps {
	onModalOpen: () => void;
}

export function TableEmployees({ onModalOpen }: IProps) {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [_, setSearchParams] = useSearchParams();
	const employees = useSelector(getEmployeesData);
	const isLoading = useSelector(getEmployeesIsLoading);

	if (isLoading) {
		return <Loader />;
	}

	const handleClickEdit = (id: number) => () => {
		setSearchParams({
			employeeId: String(id),
		});
		onModalOpen();
	};

	const handleClickDelete = (id: number) => () => {
		setOpenDeleteDialog(true);
		setSearchParams({
			employeeId: String(id),
		});
	};

	return employees && employees.length ? (
		<TableContainer
			component={Paper}
			sx={{
				m: '2rem 0',
			}}
		>
			<Table aria-label='collapsible table'>
				<TableHeader />
				<TableBody>
					{employees &&
						employees.map((row) => (
							<TableRow key={row.fullName} sx={{ '& > *': { borderBottom: 'unset' } }}>
								<TableCell>{row.fullName}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.salary || '---'} ₽</TableCell>
								<TableCell>
									<IconsWrapper>
										<IconButton aria-label='expand row' size='small' onClick={handleClickEdit(row.id)}>
											<ModeEditIcon />
										</IconButton>
										<IconButton aria-label='expand row' size='small' onClick={handleClickDelete(row.id)}>
											<DeleteIcon />
										</IconButton>
									</IconsWrapper>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
				<DeleteDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} />
			</Table>
		</TableContainer>
	) : (
		<EmptyPage />
	);
}
