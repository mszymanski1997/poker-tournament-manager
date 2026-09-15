import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../../../components/shared/Button/Button';
import styles from './TournamentButtons.module.scss';
import { useAuthContext } from '../../../../../store/AuthContext/useAuthContext';
import { deleteTournament } from '../../../../../api/tournaments';
import Modal from '../../../../../components/shared/Modal/Modal';
import { useState } from 'react';
import PendingText from '../../../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../../../components/shared/ErrorBlock/ErrorBlock';

type DeleteTournamentButtonProps = {
	id: string;
	tournamentName: string;
};

const DeleteTournamentButton = ({
	id,
	tournamentName,
}: DeleteTournamentButtonProps) => {
	const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

	const openWarningModal = () => {
		setIsWarningModalOpen(true);
	};

	const closeWarningModal = () => {
		setIsWarningModalOpen(false);
	};

	const { token } = useAuthContext();
	const queryClient = useQueryClient();

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: () => deleteTournament(token, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
	});

	return (
		<>
			<Modal isOpen={isWarningModalOpen} onClose={closeWarningModal}>
				<div className={styles.modalContainer}>
					<h2>
						Are you sure that you want to delete {tournamentName} tournament?
					</h2>

					<div className={styles.warning}>
						<p>Deleting the tournament is irreversible.</p>
					</div>

					{isError && (
						<ErrorBlock text={error.message || "Couldn't delete tournament"} />
					)}

					<div className={styles.deletingButtons}>
						<Button onClick={closeWarningModal}>Cancel</Button>
						<Button onClick={() => mutate()} className={styles.buttonDanger}>
							{isPending ? <PendingText text='Deleting' /> : 'Delete'}
						</Button>
					</div>
				</div>
			</Modal>
			<Button noMove onClick={openWarningModal}>
				Delete
			</Button>
		</>
	);
};

export default DeleteTournamentButton;
