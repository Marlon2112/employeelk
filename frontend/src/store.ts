import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loginReducer } from './Pages/Register/Slice/Reducer';

export const reducer = combineReducers({
	login: loginReducer,
});

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type TReduxState = ReturnType<typeof reducer>;
