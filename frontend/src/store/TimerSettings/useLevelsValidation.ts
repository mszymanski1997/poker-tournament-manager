import { useTimerSettings } from './useTimerSettings';

type LevelField = 'duration' | 'bigBlind' | 'smallBlind' | 'ante';

type LevelErrors = {
	[levelId: string]: Partial<Record<LevelField, string>>;
};

export const useLevelsValidation = () => {
	const { levels, updateLevelsErrors, levelsErrors } = useTimerSettings();

	const validateAllLevels = () => {
		const newErrors: LevelErrors = {};

		levels.forEach((level) => {
			const levelErrors: Partial<Record<LevelField, string>> = {};

			if (level.type === 'blind') {
				const integerFields: LevelField[] = [
					'bigBlind',
					'smallBlind',
					'ante',
					'duration',
				];

				if (level.bigBlind <= 0) {
					levelErrors.bigBlind = 'Big blind must be greater than 0';
				}

				if (level.smallBlind <= 0) {
					levelErrors.smallBlind = 'Small blind must be greater than 0';
				}

				if (level.ante < 0) {
					levelErrors.ante = 'Ante cannot be negative';
				}

				if (level.duration <= 0) {
					levelErrors.duration = 'Duration must be greater than 0';
				}

				integerFields.forEach((field) => {
					if (!Number.isInteger(level[field])) {
						levelErrors[field] = 'The value must be an integer';
					}
				});
			}

			if (level.type === 'break' && level.duration <= 0) {
				levelErrors.duration = 'Duration must be greater than 0';
			}

			if (level.type === 'break' && !Number.isInteger(level.duration)) {
				levelErrors.duration = 'The value must be an integer';
			}
			if (Object.keys(levelErrors).length > 0) {
				newErrors[level.id] = levelErrors;
			}
		});

		updateLevelsErrors(newErrors);

		return newErrors;
	};

	const clearFieldError = (
		levelId: string,
		field: LevelField,
		value: number,
	) => {
		const prev = levelsErrors;

		if (!prev[levelId]?.[field]) return;

		if (
			(prev[levelId]?.[field] !== 'The value must be an integer' &&
				value > 0) ||
			(prev[levelId]?.[field] === 'The value must be an integer' &&
				Number.isInteger(value))
		) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [field]: _, ...restFields } = prev[levelId];

			if (Object.keys(restFields).length === 0) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [levelId]: __, ...restLevels } = prev;
				updateLevelsErrors(restLevels);
				return;
			}

			updateLevelsErrors({
				...prev,
				[levelId]: restFields,
			});
		}
	};

	return {
		validateAllLevels,
		clearFieldError,
	};
};
