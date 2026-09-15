import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../../../components/shared/Button/Button';
import { useAuthContext } from '../../../../../store/AuthContext/useAuthContext';
import { deleteTournament } from '../../../../../api/tournaments';
import Modal from '../../../../../components/shared/Modal/Modal';
import { useState } from 'react';
import PendingText from '../../../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../../../components/shared/ErrorBlock/ErrorBlock';
import WarningContainer from '../../../../../components/shared/Modal/WarningContainer';

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
				<WarningContainer
					questionText={`Are you sure that you want to delete ${tournamentName} tournament?`}
					warningText='Deleting the tournament is irreversible.'
					confirmButtonText={
						isPending ? <PendingText text='Deleting' /> : 'Delete'
					}
					confirmButtonAction={() => mutate()}
					cancelButtonAction={closeWarningModal}
				>
					{isError && (
						<ErrorBlock text={error.message || "Couldn't delete tournament"} />
					)}
				</WarningContainer>
			</Modal>
			<Button noMove onClick={openWarningModal}>
				Delete
			</Button>
		</>
	);
};

export default DeleteTournamentButton;
