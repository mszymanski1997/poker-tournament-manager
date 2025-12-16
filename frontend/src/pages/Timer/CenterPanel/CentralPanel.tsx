import styles from './CentralPanel.module.scss';
import Button from '../../../components/shared/Button/Button';
import { MdPlayArrow, MdSkipPrevious, MdSkipNext } from 'react-icons/md';

type CentralPanelProps = {
	onOpenSettings: () => void;
};

const CentralPanel = ({ onOpenSettings }: CentralPanelProps) => {
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
				<Button>
					<MdSkipPrevious />
				</Button>
				<Button>
					<MdPlayArrow />
				</Button>
				<Button>
					<MdSkipNext />
				</Button>
			</div>

			<div className={styles.settingsButtons}>
				<Button size='big'>Load settings</Button>
				<Button size='big' onClick={onOpenSettings}>
					Custom settings
				</Button>
			</div>
		</div>
	);
};

export default CentralPanel;
