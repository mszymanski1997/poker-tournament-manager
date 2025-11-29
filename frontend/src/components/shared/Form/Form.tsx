import styles from './Form.module.scss';
import Button from '../Button/Button';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	return (
		<form className={styles.form}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.separator}>
				<label>
					<span>Starting stack:</span>
					<input type='number' min='0' />
				</label>
				<label>
					<span>Buy-In value:</span>
					<input type='number' min='0' />
				</label>
			</div>
			<div className={styles.separator}>
				<label>
					<span>Buy-ins:</span>
					<input type='number' min='0' />
				</label>
				<label>
					<span>Rebuys:</span>
					<input type='number' min='0' />
				</label>
			</div>
			<label>
				<span>Players-In:</span>
				<input type='number' min='0' />
			</label>

			<h2 className={styles.subtitle}>Blinds Settings</h2>

			<div className={styles.blindsSettings}>
				<label>
					<span>Big Blind:</span>
					<input type='number' min='0' />
				</label>
				<label>
					<span>Small Blind:</span>
					<input type='number' min='0' />
				</label>
				<label>
					<span>Ante:</span>
					<input type='number' min='0' />
				</label>
				<label>
					<span>Duration:</span>
					<input type='number' min='0' />
				</label>
				<Button className={styles.xButton}>X</Button>
			</div>

			<div className={styles.breakSettings}>
				<label>
					<span>Break Duration:</span>
					<input type='number' min='0' />
				</label>
			</div>

			<div className={styles.buttons}>
				<Button big>Add Blind</Button>
				<Button big>Add Break</Button>
				<Button big>Save</Button>
			</div>
		</form>
	);
};

export default Form;
