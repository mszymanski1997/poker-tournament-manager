import Button from '../../../components/shared/Button/Button';
import Modal from '../../../components/shared/Modal/Modal';
import styles from './SettingsButtons.module.scss';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import { useState } from 'react';
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';

const SettingsButtons = () => {
	const {
		loadLastSettings,
		openFormModal,
		isTournamentFinished,
		restartTournament,
	} = useTimerSettings();

	const { restartPokerSettings } = usePokerSettings();

	const [isRestartModalOpen, setIsRestartModalOpen] = useState<boolean>(false);

	const [isSettingsLoadingModalOpen, setIsSettingsLoadingModalOpen] =
		useState<boolean>(false);

	const [isSettingsLoaded, setIsSettingsLoaded] = useState<boolean>(false);

	const closeModal = () => {
		setIsRestartModalOpen(false);
	};

	const restart = () => {
		restartTournament();
		restartPokerSettings();
		setIsRestartModalOpen(false);
	};

	const handleSettingsLoading = () => {
		if (!isSettingsLoaded) {
			loadLastSettings();
			setIsSettingsLoaded(true);
			restart();
		} else {
			setIsSettingsLoadingModalOpen(true);
		}
	};

	const loadSettingsFromModal = () => {
		loadLastSettings();
		setIsSettingsLoadingModalOpen(false);
		restart();
	};

	return (
		<>
			<Modal isOpen={isRestartModalOpen} onClose={closeModal}>
				<div className={styles.restartContainer}>
					<h2>Are you sure that you want to restart tournament?</h2>
					<div className={styles.restartButtons}>
						<Button onClick={closeModal}>Cancel</Button>
						<Button onClick={restart} className={styles.buttonDanger}>
							Restart
						</Button>
					</div>
				</div>
			</Modal>

			<Modal isOpen={isSettingsLoadingModalOpen} onClose={closeModal}>
				<div className={styles.restartContainer}>
					<h2>Are you sure that you want to load last settings again?</h2>

					<div className={styles.warning}>
						<p>Loading the structure will restart the tournament.</p>
					</div>

					<div className={styles.restartButtons}>
						<Button onClick={() => setIsSettingsLoadingModalOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={loadSettingsFromModal}
							className={styles.buttonDanger}
						>
							Load settings
						</Button>
					</div>
				</div>
			</Modal>

			<div className={styles.settingsButtons}>
				<Button size='big' onClick={handleSettingsLoading}>
					Load last structure
				</Button>
				<Button size='big' onClick={() => setIsRestartModalOpen(true)}>
					Restart
				</Button>
				<Button size='big' onClick={openFormModal}>
					{isTournamentFinished ? 'Add new blinds' : 'Custom settings'}
				</Button>
			</div>
		</>
	);
};

export default SettingsButtons;
