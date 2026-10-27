import styles from '../../../../components/shared/Form/Form.module.scss';
import Button from '../../../../components/shared/Button/Button';
import TopSettings from './TopSettings';
import BottomSettings from './BottomSettings';

const AddTournamentForm = () => {
	return (
		<div className={styles.container}>
			<form className={styles.form} noValidate>
				<h2 className={styles.title}>Save settings</h2>

				<TopSettings />

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				<BottomSettings />

				<div className={styles.buttons}>
					<Button size='big'>Add Blind</Button>

					<Button size='big'>Add Break</Button>

					<Button size='big' type='submit'>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddTournamentForm;
