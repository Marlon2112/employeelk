import { TableHead } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>ФИО</TableCell>
				<TableCell>Email</TableCell>
				<TableCell style={{ width: 70 }} />
			</TableRow>
		</TableHead>
	);
}
