import styles from '../../../../components/shared/Form/Form.module.scss';
import Button from '../../../../components/shared/Button/Button';
import TopSettings from './TopSettings';
import BottomSettings from './BottomSettings';
import { useSavedTournament } from '../../store/useSavedTournament';
import AdvancedSettings from './AdvancedSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTournament } from '../../../../api/tournaments';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import { Form } from 'react-router-dom';
import PendingText from '../../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../../components/shared/ErrorBlock/ErrorBlock';

const AddTournamentForm = () => {
	const { savedTournament, addNewLevel } = useSavedTournament();

	const { token } = useAuthContext();

	const queryClient = useQueryClient();

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: () => addTournament(token, savedTournament),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tournaments'] });
		},
		onError: (error) => {
			console.log('something went wrong', error);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate();
		console.log(savedTournament);
	};

	return (
		<div className={styles.container}>
			<Form className={styles.form} onSubmit={handleSubmit} noValidate>
				<h2 className={styles.title}>Save settings</h2>

				<TopSettings />

				<AdvancedSettings />

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				<BottomSettings />

				{isError && (
					<ErrorBlock
						text={error.message || 'Try again, something went wrong'}
					/>
				)}

				<div className={styles.buttons}>
					<Button
						size='big'
						onClick={() => addNewLevel('blind')}
						type='button'
						disabled={isPending}
					>
						Add Blind
					</Button>

					<Button
						size='big'
						onClick={() => addNewLevel('break')}
						type='button'
						disabled={isPending}
					>
						Add Break
					</Button>

					<Button size='big' type='submit' disabled={isPending}>
						{isPending ? <PendingText text='Saving' /> : 'Save'}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddTournamentForm;
