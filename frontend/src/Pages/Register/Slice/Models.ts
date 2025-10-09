import { IServerAnswer } from '../../../Common/Models';

export interface IRegister {
	login: string;
	password: string;
}

export interface ILoginResponse extends IServerAnswer {
	userName: string;
	token: string;
}
