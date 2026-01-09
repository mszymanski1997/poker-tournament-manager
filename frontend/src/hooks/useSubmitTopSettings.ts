import { usePokerSettings } from '../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../store/TimerSettings/useTimerSettings';

export const useSubmitTopSettings = (): (() => void) => {
	const { validateSettings } = usePokerSettings();
	const { closeFormModal } = useTimerSettings();

	const submit = () => {
		const errors = validateSettings();

		if (Object.keys(errors).length > 0) return;

		closeFormModal();
	};

	return submit;
};
