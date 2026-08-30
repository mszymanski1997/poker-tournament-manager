import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null);

	const login = () => {};
	const logout = () => {};

	return (
		<AuthContext.Provider
			value={{ token, userId, isAuthenticated: !!token, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
