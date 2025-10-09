import { createReducer } from '@reduxjs/toolkit';
import { EReduxStatus } from '../../../Common/Enums';
import { getInitialState } from '../../../Common/Utils';
import { loginAction } from './Actions';
import { ILoginResponse } from './Models';

const INITIAL_SLICE_STATE = getInitialState<ILoginResponse | null>(null);

export const loginReducer = createReducer(INITIAL_SLICE_STATE, (builder) => {
	builder
		.addCase(loginAction.pending, (reducerSate) => {
			reducerSate.status = EReduxStatus.RUNNING;
			reducerSate.errors = null;
		})
		.addCase(loginAction.fulfilled, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.SUCCESS;
			reducerSate.data = action.payload;
		})
		.addCase(loginAction.rejected, (reducerSate, action) => {
			reducerSate.status = EReduxStatus.FAIL;
			reducerSate.errors = action.payload as string;
		});
});
