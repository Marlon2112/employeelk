// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = createTheme({
	palette: {
		primary: {
			main: '#5a67ba',
			light: '#e4e7f5',
		},
		// secondary: {
		// 	main: '#5a67ba',
		// },
	},
});

export default theme;
