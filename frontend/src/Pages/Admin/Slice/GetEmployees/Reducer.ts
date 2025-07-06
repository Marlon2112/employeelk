import { createReducer } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../../Common/Enums';
import { getInitialState } from '../../../../Common/Utils';
import { getEmployees } from './Actions';
import { IEmployee } from './Models';

const INITIAL_SLICE_STATE = getInitialState<IEmployee[] | null>(null);

export const getEmployeesReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addCase(getEmployees.pending, (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addCase(getEmployees.fulfilled, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addCase(getEmployees.rejected, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
