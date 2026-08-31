import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from './types';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null);

	const login = (newToken: string) => {
		try {
			const decoded = jwtDecode<JwtPayload>(newToken);
			console.log('Decoded value is:', decoded);

			setToken(newToken);
			setUserId(decoded.sub);

			localStorage.setItem('accessToken', newToken);
		} catch (error) {
			console.error('Failed to decode JWT token:', error);
		}
	};

	const logout = () => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('accessToken');
	};

	return (
		<AuthContext.Provider
			value={{ token, userId, isAuthenticated: !!token, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
