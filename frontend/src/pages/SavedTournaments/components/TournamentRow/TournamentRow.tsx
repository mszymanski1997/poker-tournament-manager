import styles from './TournamentRow.module.scss';
import Button from '../../../../components/shared/Button/Button';
import DeleteTournamentButton from './Buttons/DeleteTournamentButton';
import LoadTournamentButton from './Buttons/LoadTournamentButton';
import type { SavedTournament } from '../../types';
import {
	formatBuyIn,
	formatLevelsDuration,
	formatStartingStack,
} from '../../util/tournamentFormatter';

type TournamentRowProps = {
	tournament: SavedTournament;
};

const TournamentRow = ({ tournament }: TournamentRowProps) => {
	return (
		<tr id={tournament._id}>
			<td className={styles.nameCell}>{tournament.name}</td>
			<td>
				{formatBuyIn(
					tournament.buyIn,
					tournament.currency,
					tournament.rake.enabled,
					tournament.rake.value,
				)}
			</td>
			<td>
				{formatStartingStack(tournament.startingStack, tournament.levels)}
			</td>
			<td>{formatLevelsDuration(tournament.levels)}</td>
			<td>{tournament.addons.enabled ? 'YES' : 'NO'}</td>
			<td className={styles.actionsCell}>
				<LoadTournamentButton tournament={tournament} />
				<Button noMove>Edit</Button>
				<DeleteTournamentButton
					id={tournament._id}
					tournamentName={tournament.name}
				/>
			</td>
		</tr>
	);
};

export default TournamentRow;
