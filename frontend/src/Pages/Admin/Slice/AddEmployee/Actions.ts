import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee } from './Models';

export const addEmployee = createAsyncThunk('addEmployee', async (formData: IEmployee, { rejectWithValue }) => {
	try {
		const response = await fetch('/api/add-employee', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
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
