import type { SavedTournament } from '../../types';
import Button from '../../../../components/shared/Button/Button';
import TournamentRow from '../TournamentRow/TournamentRow';
import styles from './TournamentsTable.module.scss';
import { getAllTournaments } from '../../../../api/tournaments';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import { useQuery } from '@tanstack/react-query';

const TournamentsTable = () => {
	const { token } = useAuthContext();

	const { data: allTournaments } = useQuery({
		queryKey: ['tournaments', token],
		queryFn: () => getAllTournaments(token),
		enabled: !!token,
	});

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.tableHeader}>
				<h2>Saved Tournaments</h2>
				<Button className={styles.addButton} noMove>
					+ Add new tournament
				</Button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Buy-in</th>
						<th>Starting stack</th>
						<th>Levels duration</th>
						<th className={styles.actionsHeader}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{allTournaments?.map((tournament: SavedTournament) => (
						<TournamentRow
							key={tournament._id}
							name={tournament.name}
							buyIn={tournament.buyIn.toString()}
							startingStack={tournament.startingStack.toString()}
							duration={tournament.levels?.[0].duration?.toString() ?? ''}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TournamentsTable;
