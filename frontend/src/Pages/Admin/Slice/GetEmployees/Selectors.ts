import { EReduxStatus } from '../../../../Common/Enums';
import { TReduxState } from '../../../../store';

export const getEmployeesIsLoading = ({ employee }: TReduxState) => {
	return employee.getEmployees.status === EReduxStatus.RUNNING;
};

export const getEmployeesData = ({ employee }: TReduxState) => {
	return employee.getEmployees.data;
};
