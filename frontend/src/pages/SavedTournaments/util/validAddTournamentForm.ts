import type {
	LevelErrors,
	SavedTournament,
	TournamentFormErros,
} from '../types';

export const validateAddTournamentForm = (tournament: SavedTournament) => {
	const errors: TournamentFormErros = {};

	if (!tournament.name || tournament.name.trim().length < 3) {
		errors.name = 'Tournament name must be at least 3 characters long';
	}

	if (tournament.buyIn === undefined || tournament.buyIn <= 0) {
		errors.buyIn = 'Buy-in must be greater than 0';
	}

	if (tournament.startingStack === undefined || tournament.startingStack <= 0) {
		errors.startingStack = 'Starting stack must be greater than 0';
	}

	if (tournament.rake?.enabled) {
		if (tournament.rake.value === undefined || tournament.rake.value <= 0) {
			errors.rake = 'Rake value must be greater than 0';
		}
	}

	if (tournament.addons?.enabled) {
		if (tournament.addons.value === undefined || tournament.addons.value <= 0) {
			errors.addons = 'Addon value must be greater than 0';
		}
	}

	const levelsErrors: Record<string, LevelErrors> = {};

	tournament.levels.forEach((lvl) => {
		if (!lvl.id) return;

		const currentLevelErrors: LevelErrors = {};

		if (!lvl.duration || lvl.duration < 1) {
			currentLevelErrors.duration = 'Duration must be at least 1 minute';
		}

		if (lvl.type === 'blind') {
			if (!lvl.smallBlind || lvl.smallBlind <= 0) {
				currentLevelErrors.smallBlind = 'Small blind must be greater than 0';
			} else if (
				lvl.bigBlind !== undefined &&
				lvl.bigBlind > 0 &&
				lvl.smallBlind > lvl.bigBlind
			) {
				currentLevelErrors.smallBlind =
					'Small blind cannot be higher than big blind';
			}

			if (!lvl.bigBlind || lvl.bigBlind <= 0) {
				currentLevelErrors.bigBlind = 'Big blind must be greater than 0';
			}

			if (lvl.ante !== undefined) {
				if (lvl.ante < 0) {
					currentLevelErrors.ante = 'Ante cannot be negative';
				} else if (
					lvl.ante > 0 &&
					lvl.bigBlind &&
					lvl.bigBlind > 0 &&
					lvl.ante < lvl.bigBlind / 10
				) {
					currentLevelErrors.ante =
						'Ante muste be 0 or at least 10% of the big blind';
				}
			}
		}

		if (Object.keys(currentLevelErrors).length > 0) {
			levelsErrors[lvl.id] = currentLevelErrors;
		}
	});

	if (Object.keys(levelsErrors).length > 0) {
		errors.levels = levelsErrors;
	}

	const isValid = Object.keys(errors).length === 0;

	return { isValid, errors };
};
