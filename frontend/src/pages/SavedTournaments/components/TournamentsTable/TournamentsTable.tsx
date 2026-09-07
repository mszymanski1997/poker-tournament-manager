import Button from '../../../../components/shared/Button/Button';
import styles from './TournamentsTable.module.scss';

const TournamentsTable = () => {
	return (
		<div className={styles.tableWrapper}>
			<div className={styles.tableHeader}>
				<h2>Saved Tournaments</h2>
				<Button className={styles.addButton}>+ Add new tournament</Button>
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
					<tr>
						<td className={styles.nameCell}>Deepstack</td>
						<td>100 PLN</td>
						<td>500 BB</td>
						<td>20 min</td>
						<td className={styles.actionsCell}>
							<Button>Load</Button>
							<Button>Edit</Button>
							<Button>Delete</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TournamentsTable;
