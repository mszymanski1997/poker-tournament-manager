import styles from './CentralPanel.module.scss';
import Button from '../../../components/shared/Button/Button';

const CentralPanel = () => {
	return (
		<div className={styles.container}>
			<p className={styles.time}>25:00</p>

			<div className={styles.blindsInfo}>
				<p>Current Blinds:</p>
				<p className={styles.blinds}>10/5</p>
				<p>
					Ante: <span>10</span>
				</p>
			</div>

			<div className={styles.timerButtons}>
				<Button>PR</Button>
				<Button>PL</Button>
				<Button>NX</Button>
			</div>

			<div className={styles.settingsButtons}>
				<Button big>Load settings</Button>
				<Button big>Custom settings</Button>
			</div>
		</div>
	);
};

export default CentralPanel;
