import { createReducer } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../../Common/Enums';
import { getInitialState } from '../../../../Common/Utils';
import { IEmployee } from '../Models';
import { getEmployeeById } from './Actions';

const INITIAL_SLICE_STATE = getInitialState<IEmployee | null>(null);

export const getEmployeeByIdReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addCase(getEmployeeById.pending, (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addCase(getEmployeeById.fulfilled, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addCase(getEmployeeById.rejected, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
