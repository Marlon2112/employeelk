// src/theme/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		palette: {
			primary: {
				main: string;
				light: string;
			};
		};
	}
}
