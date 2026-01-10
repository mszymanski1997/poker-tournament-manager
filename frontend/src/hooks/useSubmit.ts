import { usePokerSettings } from '../store/PokerSettings/usePokerSettings';
import { useLevelsValidation } from '../store/TimerSettings/useLevelsValidation';
import { useTimerSettings } from '../store/TimerSettings/useTimerSettings';

export const useSubmit = (): (() => void) => {
	const { validateSettings } = usePokerSettings();
	const { validateAllLevels } = useLevelsValidation();
	const { closeFormModal } = useTimerSettings();

	const submit = () => {
		const errors = validateSettings();
		const levelsErrors = validateAllLevels();

		if (Object.keys(errors).length > 0 || Object.keys(levelsErrors).length > 0)
			return;

		closeFormModal();
	};

	return submit;
};
