export const getUser = async (token: string | null) => {
	const response = await fetch('http://localhost:3000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch user profile');
	}

	return response.json();
};
