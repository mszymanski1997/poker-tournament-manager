import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { AuthStateType, JwtPayload } from './types';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const getInitialAuthState = () => {
		const storedToken = localStorage.getItem('accessToken');

		if (!storedToken) {
			return {
				token: null,
				userId: null,
			};
		}

		try {
			const decoded = jwtDecode<JwtPayload>(storedToken);
			const isExpired = decoded.exp * 1000 < Date.now();

			if (isExpired) {
				localStorage.removeItem('accessToken');
				return {
					token: null,
					userId: null,
				};
			}

			return {
				token: storedToken,
				userId: decoded.sub,
			};
		} catch (error) {
			console.error('Invalid token found in localStorage:', error);

			localStorage.removeItem('accessToken');

			return {
				token: null,
				userId: null,
			};
		}
	};

	const [authState, setAuthState] =
		useState<AuthStateType>(getInitialAuthState);

	const login = (newToken: string) => {
		try {
			const decoded = jwtDecode<JwtPayload>(newToken);

			setAuthState({
				token: newToken,
				userId: decoded.sub,
			});

			localStorage.setItem('accessToken', newToken);
		} catch (error) {
			console.error('Failed to decode JWT token:', error);
		}
	};

	const logout = () => {
		setAuthState({
			token: null,
			userId: null,
		});

		localStorage.removeItem('accessToken');
	};

	return (
		<AuthContext.Provider
			value={{
				token: authState.token,
				userId: authState.userId,
				isAuthenticated: !!authState.token,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
