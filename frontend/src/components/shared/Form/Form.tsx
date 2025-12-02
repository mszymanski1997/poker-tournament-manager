import styles from './Form.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	return (
		<form className={styles.form}>
			<h2 className={styles.title}>{title}</h2>

			<div className={styles.separator}>
				<Input text='Starting stack' id='starting-stack' />
				<Input text='Buy-In value:' id='buy-in-value' />
			</div>

			<div className={styles.separator}>
				<Input text='Buy-ins:' id='buy-ins' />
				<Input text='Rebuys:' id='rebuys' />
			</div>

			<Input text='Players-In:' id='players-in' />

			<h2 className={styles.subtitle}>Blinds Settings</h2>

			<div className={styles.blindsSettings}>
				<Input text='Big Blind:' id='big-blind' />
				<Input text='Small Blind:' id='small-blind' />
				<Input text='Ante:' id='ante' />
				<Input text='Duration:' id='duration' />
				<Button className={styles.xButton}>X</Button>
			</div>

			<div className={styles.breakSettings}>
				<Input text='Break Duration:' id='break-duration' />
				<Button className={styles.xButton}>X</Button>
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
