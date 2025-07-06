import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee } from './Models';

export const getEmployees = createAsyncThunk<IEmployee[]>('getEmployees', async (_, { rejectWithValue }) => {
	try {
		const url = 'api/employees'; // заменить когда бэк будет готов
		const mockUrl = '/Stub/employees.json';
		const response = await fetch(mockUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
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
