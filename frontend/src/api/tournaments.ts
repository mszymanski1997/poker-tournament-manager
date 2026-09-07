export const getAllTournaments = async (token: string | null) => {
	const response = await fetch('http://localhost:3000/tournaments', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch tournamets');
	}

	return response.json();
};
