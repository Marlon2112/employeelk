import { createReducer } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../../Common/Enums';
import { getInitialState } from '../../../../Common/Utils';
import { addEmployee } from './Actions';
import { IEmployee } from './Models';

const INITIAL_SLICE_STATE = getInitialState<IEmployee | null>(null);

export const addEmployeeReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addCase(addEmployee.pending, (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addCase(addEmployee.fulfilled, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addCase(addEmployee.rejected, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
