import styles from './TournamentRow.module.scss';
import Button from '../../../../components/shared/Button/Button';

type TournamentRowProps = {
	name: string;
	buyIn: string;
	startingStack: string;
	duration: string;
};

const TournamentRow = ({
	name,
	buyIn,
	startingStack,
	duration,
}: TournamentRowProps) => {
	return (
		<tr>
			<td className={styles.nameCell}>{name}</td>
			<td>{buyIn}</td>
			<td>{startingStack}</td>
			<td>{duration}</td>
			<td className={styles.actionsCell}>
				<Button noMove>Load</Button>
				<Button noMove>Edit</Button>
				<Button noMove>Delete</Button>
			</td>
		</tr>
	);
};

export default TournamentRow;
