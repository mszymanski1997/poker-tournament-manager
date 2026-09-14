import styles from './TournamentRow.module.scss';
import Button from '../../../../components/shared/Button/Button';
import DeleteTournamentButton from './Buttons/DeleteTournamentButton';

type TournamentRowProps = {
	name: string;
	buyIn: string;
	startingStack: string;
	duration: string;
	id: string;
};

const TournamentRow = ({
	name,
	buyIn,
	startingStack,
	duration,
	id,
}: TournamentRowProps) => {
	return (
		<tr id={id}>
			<td className={styles.nameCell}>{name}</td>
			<td>{buyIn}</td>
			<td>{startingStack}</td>
			<td>{duration}</td>
			<td className={styles.actionsCell}>
				<Button noMove>Load</Button>
				<Button noMove>Edit</Button>
				<DeleteTournamentButton id={id} />
			</td>
		</tr>
	);
};

export default TournamentRow;
