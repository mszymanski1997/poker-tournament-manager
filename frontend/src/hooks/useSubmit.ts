import { usePokerSettings } from '../store/PokerSettings/usePokerSettings';
import { useLevelsValidation } from '../store/TimerSettings/useLevelsValidation';
import { useTimerSettings } from '../store/TimerSettings/useTimerSettings';
import { useLocalStorage } from './useLocalStorage';
import type { Level } from '../store/TimerSettings/types';

export const useSubmit = (): (() => void) => {
	const { validateSettings } = usePokerSettings();
	const { validateAllLevels } = useLevelsValidation();
	const { closeFormModal } = useTimerSettings();
	const { levels } = useTimerSettings();
	const { setValue } = useLocalStorage<Level[]>('levels');

	const submit = () => {
		const errors = validateSettings();
		const levelsErrors = validateAllLevels();

		if (Object.keys(errors).length > 0 || Object.keys(levelsErrors).length > 0)
			return;

		setValue(levels);
		closeFormModal();
	};

	return submit;
};
