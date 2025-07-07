import { EReduxStatus } from '../../../../Common/Enums';
import { TReduxState } from '../../../../store';

export const addEmployeeIsLoading = ({ employee }: TReduxState) => {
	return employee.addEmployee.status === EReduxStatus.RUNNING;
};
