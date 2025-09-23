import { EReduxStatus } from '../../../../Common/Enums';
import { TReduxState } from '../../../../store';

export const getEmployeeDataIsLoading = ({ employee }: TReduxState) => {
	return employee.getEmployeeById.status === EReduxStatus.RUNNING;
};
