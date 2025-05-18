import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { IRegister } from './Models';

export const login = createAsyncThunk('LOGIN', async (registerData: IRegister, { rejectWithValue }) => {
	try {
		const response = await api.post('/login', registerData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});
