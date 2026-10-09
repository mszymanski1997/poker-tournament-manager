import { useNavigate } from 'react-router-dom';
import Modal from '../../../../../components/shared/Modal/Modal';
import Button from '../../../../../components/shared/Button/Button';
import WarningContainer from '../../../../../components/shared/Modal/WarningContainer';
import { usePokerSettings } from '../../../../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../../../../store/TimerSettings/useTimerSettings';
import { type SavedTournament } from '../../../types';
import { useState } from 'react';

type LoadTournamentButtonProps = {
	tournament: SavedTournament;
};

const LoadTournamentButton = ({ tournament }: LoadTournamentButtonProps) => {
	const { loadSettingsFromBackend, restartPokerSettings } = usePokerSettings();
	const { loadLevelsFromBackend, restartTournament } = useTimerSettings();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const navigate = useNavigate();

	const loadSettings = () => {
		restartPokerSettings();
		restartTournament();

		loadSettingsFromBackend(tournament);
		loadLevelsFromBackend(tournament.levels);
		navigate('/');
	};

	return (
		<>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<WarningContainer
					questionText={`Are you sure that you want to load ${tournament.name} tournament?`}
					warningText='Loading a new tournament will reset your current progress.'
					confirmButtonText='Load'
					confirmButtonAction={loadSettings}
					cancelButtonAction={closeModal}
				/>
			</Modal>
			<Button noMove onClick={openModal}>
				Load
			</Button>
		</>
	);
};

export default LoadTournamentButton;
