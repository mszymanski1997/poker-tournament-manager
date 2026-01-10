import { useTimerSettings } from './useTimerSettings';

type LevelField = 'duration' | 'bigBlind' | 'smallBlind' | 'ante';

type LevelErrors = {
	[levelId: string]: Partial<Record<LevelField, string>>;
};

export const useLevelsValidation = () => {
	const { levels, updateLevelsErrors } = useTimerSettings();

	const validateAllLevels = () => {
		const newErrors: LevelErrors = {};

		levels.forEach((level) => {
			const levelErrors: Partial<Record<LevelField, string>> = {};

			if (level.type === 'blind') {
				if (level.duration <= 0) {
					levelErrors.duration = 'Duration must be greater than 0';
				}

				if (level.bigBlind <= 0) {
					levelErrors.bigBlind = 'Big blind must be greater than 0';
				}

				if (level.smallBlind <= 0) {
					levelErrors.smallBlind = 'Small blind must be greater than 0';
				}

				if (level.ante < 0) {
					levelErrors.ante = 'Ante cannot be negative';
				}
			}

			if (level.type === 'break' && level.duration <= 0) {
				levelErrors.duration = 'Duration must be greater than 0';
			}

			if (Object.keys(levelErrors).length > 0) {
				newErrors[level.id] = levelErrors;
			}
		});

		updateLevelsErrors(newErrors);
		return newErrors;
	};

	return {
		validateAllLevels,
	};
};
