import type { SavedTournament } from '../../types';
import Button from '../../../../components/shared/Button/Button';
import TournamentRow from '../TournamentRow/TournamentRow';
import styles from './TournamentsTable.module.scss';
import { getAllTournaments } from '../../../../api/tournaments';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import PendingText from '../../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../../components/shared/ErrorBlock/ErrorBlock';

const TournamentsTable = () => {
	const { token } = useAuthContext();

	const {
		data: allTournaments,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['tournaments', token],
		queryFn: () => getAllTournaments(token),
		enabled: !!token,
	});

	const hasTournaments = allTournaments && allTournaments.length > 0;

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.tableHeader}>
				<h2>Saved Tournaments</h2>
				<Button className={styles.addButton} noMove>
					+ Add new tournament
				</Button>
			</div>

			{isLoading && (
				<PendingText
					text='Loading saved tournaments'
					className={styles.tableStateText}
				/>
			)}

			{isError && (
				<ErrorBlock text={error.message} className={styles.tableErrorBlock} />
			)}

			{!isLoading && !isError && !hasTournaments && (
				<div className={styles.emptyTextWrapper}>
					<p className={styles.emptyText}>
						No saved tournaments found. Click the button above to create your
						first!
					</p>
				</div>
			)}

			{!isLoading && !isError && hasTournaments && (
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
			)}
		</div>
	);
};

export default TournamentsTable;
