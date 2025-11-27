import styles from './CentralPanel.module.scss';

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
				<button>PR</button>
				<button>PL</button>
				<button>NX</button>
			</div>

			<div className={styles.settingsButtons}>
				<button>Load settings</button>
				<button>Custom settings</button>
			</div>
		</div>
	);
};

export default CentralPanel;
