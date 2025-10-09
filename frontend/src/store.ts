import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { employeeReducer } from './Pages/Admin/Slice';
import { loginReducer } from './Pages/Register/Slice/Reducer';

export const reducer = combineReducers({
	login: loginReducer,
	employee: employeeReducer,
});

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type TReduxState = ReturnType<typeof reducer>;
