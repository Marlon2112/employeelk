import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee } from '../Models';

export const getEmployeeById = createAsyncThunk<IEmployee, number>('getEmployeeById', async (id, { rejectWithValue }) => {
	try {
		const response = await fetch(`api/admin/employees/${id}`, {
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
