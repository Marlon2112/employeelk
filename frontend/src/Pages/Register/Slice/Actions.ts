import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRegister } from './Models';

export const login = createAsyncThunk('auth/login', async (formData: IRegister, { rejectWithValue }) => {
	const url = '/api/login';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				login: formData.login,
				password: formData.password,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || 'Ошибка при запросе');
		}

		return data;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});
