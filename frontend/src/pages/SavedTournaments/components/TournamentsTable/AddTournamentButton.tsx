import styles from './AddTournamentButton.module.scss';
import Button from '../../../../components/shared/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTournament } from '../../../../api/tournaments';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import type { SavedTournament } from '../../types';
import PendingText from '../../../../components/shared/PendingText/PendingText';

const AddTournamentButton = () => {
	const DUMMY_TOURNAMENT: Omit<
		SavedTournament,
		'_id' | 'owner' | 'addons' | 'rake'
	> = {
		name: 'Test tournament',
		buyIn: 100,
		startingStack: 35000,
		currency: 'PLN',
		levels: [
			{
				type: 'blind',
				duration: 20,
				bigBlind: 300,
				smallBlind: 100,
				ante: 300,
			},
			{
				type: 'blind',
				duration: 20,
				bigBlind: 400,
				smallBlind: 200,
				ante: 400,
			},
			{
				type: 'blind',
				duration: 20,
				bigBlind: 600,
				smallBlind: 300,
				ante: 600,
			},
			{
				type: 'blind',
				duration: 20,
				bigBlind: 800,
				smallBlind: 400,
				ante: 800,
			},
		],
	};

	const { token } = useAuthContext();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: () => addTournament(token, DUMMY_TOURNAMENT),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
	});

	return (
		<Button
			className={styles.addButton}
			onClick={() => mutate()}
			disabled={isPending}
			noMove
		>
			{isPending ? <PendingText text='Adding' /> : '+ Add new tournament'}
		</Button>
	);
};

export default AddTournamentButton;
