import styles from './TournamentRow.module.scss';
import Button from '../../../../components/shared/Button/Button';
import DeleteTournamentButton from './Buttons/DeleteTournamentButton';
import LoadTournamentButton from './Buttons/LoadTournamentButton';

type TournamentRowProps = {
	name: string;
	buyIn: string;
	startingStack: string;
	duration: string;
	id: string;
	isAddon: boolean;
};

const TournamentRow = ({
	name,
	buyIn,
	startingStack,
	duration,
	id,
	isAddon,
}: TournamentRowProps) => {
	return (
		<tr id={id}>
			<td className={styles.nameCell}>{name}</td>
			<td>{buyIn}</td>
			<td>{startingStack}</td>
			<td>{duration}</td>
			<td>{isAddon ? 'YES' : 'NO'}</td>
			<td className={styles.actionsCell}>
				<LoadTournamentButton />
				<Button noMove>Edit</Button>
				<DeleteTournamentButton id={id} tournamentName={name} />
			</td>
		</tr>
	);
};

export default TournamentRow;
