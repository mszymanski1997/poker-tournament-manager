import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../../../components/shared/Button/Button';
import { useAuthContext } from '../../../../../store/AuthContext/useAuthContext';
import { deleteTournament } from '../../../../../api/tournaments';

type DeleteTournamentButtonProps = {
	id: string;
};

const DeleteTournamentButton = ({ id }: DeleteTournamentButtonProps) => {
	const { token } = useAuthContext();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => deleteTournament(token, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
	});

	return (
		<Button noMove onClick={() => mutate()}>
			Delete
		</Button>
	);
};

export default DeleteTournamentButton;
