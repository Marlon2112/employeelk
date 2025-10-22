import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Header } from '../../../../Common/Components/Header';
import { Content } from './Components/Content';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ isOpen, onClose }: IProps) {
	return (
		<Dialog fullWidth maxWidth={'sm'} open={isOpen} onClose={onClose}>
			<DialogTitle>
				<Header>Добавление сотрудника</Header>
			</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={onClose}
				sx={(theme) => ({
					position: 'absolute',
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<CloseIcon />
			</IconButton>
			<Content onClose={onClose} isOpen={isOpen} />
		</Dialog>
	);
}
