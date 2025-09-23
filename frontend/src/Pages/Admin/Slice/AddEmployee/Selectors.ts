import { EReduxStatus } from '../../../../Common/Enums';
import { TReduxState } from '../../../../store';

export const employeeActionIsLoading = ({ employee }: TReduxState) => {
	return employee.addEmployee.status === EReduxStatus.RUNNING;
};
