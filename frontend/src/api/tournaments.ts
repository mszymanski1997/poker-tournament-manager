import type { SavedTournament } from '../pages/SavedTournaments/types';

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
		throw new Error(error.message || 'Failed to fetch tournaments');
	}

	return response.json();
};

export const deleteTournament = async (token: string | null, id: string) => {
	const response = await fetch(`http://localhost:3000/tournaments/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to delete tournament');
	}

	return response.json();
};

export const addTournament = async (
	token: string | null,
	tournament: Partial<SavedTournament>,
) => {
	const response = await fetch(`http://localhost:3000/tournaments`, {
		method: 'POST',
		body: JSON.stringify(tournament),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to add tournament');
	}

	return response.json();
};
