import { createReducer } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../Common/Enums';
import { getInitialState } from '../../../Common/Utils';
import { login } from './Actions';
import { IRegister } from './Models';

const INITIAL_SLICE_STATE = getInitialState<IRegister | null>(null);

export const loginReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addCase(login.pending, (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addCase(login.fulfilled, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addCase(login.rejected, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
