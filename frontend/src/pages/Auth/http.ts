import { type RegisterFormData } from './types';

export const register = async (data: RegisterFormData) => {
	const payload = {
		userName: data.userName,
		email: data.email,
		password: data.password,
	};

	const response = await fetch('http://localhost:3000/users/signup', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Failed to register');
	}

	return response.json();
};
