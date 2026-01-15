import { usePokerSettings } from '../store/PokerSettings/usePokerSettings';
import { useLevelsValidation } from '../store/TimerSettings/useLevelsValidation';
import { useTimerSettings } from '../store/TimerSettings/useTimerSettings';
import { useLocalStorage } from './useLocalStorage';
import type { Level } from '../store/TimerSettings/types';
import type { GameSettings } from '../store/PokerSettings/types';

export const useSubmit = (): (() => void) => {
	const { validateSettings, settings } = usePokerSettings();
	const { validateAllLevels } = useLevelsValidation();
	const { closeFormModal, levels } = useTimerSettings();
	const { setValue } = useLocalStorage<Level[]>('levels');
	const { setValueWithExpiry } = useLocalStorage<GameSettings>('settings');

	const submit = () => {
		const errors = validateSettings();
		const levelsErrors = validateAllLevels();
		const totalTournamentDuration = levels.reduce(
			(sum, level) => sum + level.duration,
			0
		);

		if (Object.keys(errors).length > 0 || Object.keys(levelsErrors).length > 0)
			return;

		setValue(levels);
		setValueWithExpiry(settings, totalTournamentDuration);

		closeFormModal();
	};

	return submit;
};
