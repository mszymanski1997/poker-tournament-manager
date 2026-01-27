import { usePokerSettings } from '../store/PokerSettings/usePokerSettings';
import { useLevelsValidation } from '../store/TimerSettings/useLevelsValidation';
import { useTimerSettings } from '../store/TimerSettings/useTimerSettings';
import { useLocalStorage } from './useLocalStorage';
import type { Level } from '../store/TimerSettings/types';
import type { GameSettings } from '../store/PokerSettings/types';

export const useSubmit = (): (() => void) => {
	const { validateSettings, settings } = usePokerSettings();

	const { validateAllLevels } = useLevelsValidation();

	const { closeFormModal, levels, totalTournamentDuration } =
		useTimerSettings();

	const levelsStorage = useLocalStorage<Level[]>('levels');

	const levelsToExpireStorage = useLocalStorage<Level[]>('levelsToExpiry');

	const settingsStorage = useLocalStorage<GameSettings>('settings');

	const submit = () => {
		const errors = validateSettings();
		const levelsErrors = validateAllLevels();

		if (Object.keys(errors).length > 0 || Object.keys(levelsErrors).length > 0)
			return;

		levelsStorage.setValue(levels);

		levelsToExpireStorage.setValueWithExpiry(levels, totalTournamentDuration);

		settingsStorage.setValueWithExpiry(settings, totalTournamentDuration);

		closeFormModal();
	};

	return submit;
};
