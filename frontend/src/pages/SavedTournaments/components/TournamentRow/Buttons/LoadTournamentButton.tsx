import Button from '../../../../../components/shared/Button/Button';
import { usePokerSettings } from '../../../../../store/PokerSettings/usePokerSettings';
import { type SavedTournament } from '../../../types';

type LoadTournamentButtonProps = {
	tournament: SavedTournament;
};

const LoadTournamentButton = ({ tournament }: LoadTournamentButtonProps) => {
	const { loadSettingsFromBackend } = usePokerSettings();

	const loadSettings = () => {
		loadSettingsFromBackend(tournament);
	};

	return (
		<Button noMove onClick={loadSettings}>
			Load
		</Button>
	);
};

export default LoadTournamentButton;
