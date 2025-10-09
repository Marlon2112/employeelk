import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';

export interface AuthInfo {
	user: string | null;
	setUser: ((user: string) => void) | undefined;
	isAuthenticated: boolean;
	login: (token: string, user: string) => void;
	logout: () => void;
	token: string | null;
}

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (newToken: string, newUser: string) => {
		setToken(newToken);
		setUser(newUser);
		localStorage.setItem('token', newToken);
		localStorage.setItem('user', JSON.stringify(newUser));
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	return <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!token, login, token, logout }}>{children}</AuthContext.Provider>;
}
