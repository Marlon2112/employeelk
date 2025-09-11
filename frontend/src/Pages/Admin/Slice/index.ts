import { combineReducers } from '@reduxjs/toolkit';
import { addEmployeeReducer } from './AddEmployee/Reducer';
import { getEmployeesReducer } from './GetEmployees/Reducer';
import { getEmployeeByIdReducer } from './GetEmployee/Reducer';

export const employeeReducer = combineReducers({
	addEmployee: addEmployeeReducer,
	getEmployees: getEmployeesReducer,
	getEmployeeById: getEmployeeByIdReducer,
});
