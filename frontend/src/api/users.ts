export const getUser = async (id: string) => {
	const response = await fetch(`http://localhost:3000/users/${id}`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch user profile');
	}

	return response.json();
};
