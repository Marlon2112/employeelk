import { combineReducers } from '@reduxjs/toolkit';
import { addEmployeeReducer } from './AddEmployee/Reducer';
import { getEmployeesReducer } from './GetEmployees/Reducer';

export const employeeReducer = combineReducers({
	addEmployee: addEmployeeReducer,
	getEmployees: getEmployeesReducer,
});
