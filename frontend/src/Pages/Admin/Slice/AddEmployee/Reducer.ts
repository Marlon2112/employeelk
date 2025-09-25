import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../../Common/Enums';
import { getInitialState } from '../../../../Common/Utils';
import { addEmployee, deleteEmployee, updateEmployee } from './Actions';
import { IServerAnswer } from '../../../../Common/Models';

const INITIAL_SLICE_STATE = getInitialState<IServerAnswer | null>(null);

export const addEmployeeReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addMatcher(isAnyOf(addEmployee.pending, updateEmployee.pending, deleteEmployee.pending), (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addMatcher(isAnyOf(addEmployee.fulfilled, updateEmployee.fulfilled, deleteEmployee.fulfilled), (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addMatcher(isAnyOf(addEmployee.rejected, updateEmployee.rejected, deleteEmployee.rejected), (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
