import { EReduxStatus } from '../../../Common/Enums';
import { TReduxState } from '../../../store';

export const loginIsLoading = ({ login }: TReduxState) => {
	return login.status === EReduxStatus.RUNNING;
};
