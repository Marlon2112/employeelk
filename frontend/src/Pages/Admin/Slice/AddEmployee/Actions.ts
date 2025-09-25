import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee } from '../Models';
import { IServerAnswer } from '../../../../Common/Models';

export const addEmployee = createAsyncThunk<IServerAnswer, Omit<IEmployee, 'id'>>('addEmployee', async (formData, { rejectWithValue }) => {
	try {
		const response = await fetch('/api/admin/employee', {
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

export const updateEmployee = createAsyncThunk<IServerAnswer, IEmployee>('updateEmployee', async (formData: IEmployee, { rejectWithValue }) => {
	try {
		const response = await fetch('/api/admin/employee', {
			method: 'PUT',
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

export const deleteEmployee = createAsyncThunk<IServerAnswer, number>('deleteEmployee', async (id: number, { rejectWithValue }) => {
	try {
		const response = await fetch(`/api/admin/employee/${id}`, {
			method: 'DELETE',
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
