import { EReduxStatus } from '../Enums';

interface IAsyncData<T> {
	data: T;
	errors: string | null;
	status: EReduxStatus;
}

export function getInitialState<T>(data: T): IAsyncData<T> {
	return { data, errors: null, status: EReduxStatus.IDLE };
}
