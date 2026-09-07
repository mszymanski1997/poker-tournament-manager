import Button from '../../../../components/shared/Button/Button';
import TournamentRow from '../TournamentRow/TournamentRow';
import styles from './TournamentsTable.module.scss';

const TournamentsTable = () => {
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
					<TournamentRow
						name='Deepstack'
						buyIn='200 PLN'
						startingStack='250BB'
						duration='20min'
					/>
				</tbody>
			</table>
		</div>
	);
};

export default TournamentsTable;
