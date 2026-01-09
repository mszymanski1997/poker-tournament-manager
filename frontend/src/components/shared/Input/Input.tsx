import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	minValue?: number;
	warning?: boolean;
	error?: boolean;
	warningText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
	label,
	type = 'number',
	minValue = 0,
	error = false,
	warningText,
	...props
}: InputProps) => {
	return (
		<label className={styles.label}>
			<span>{label}</span>
			<input
				type={type}
				min={minValue}
				className={`${styles.input} ${
					error ? styles.warningBackground : styles.normalInput
				}`}
				{...props}
			/>
			{error && <p className={styles.warningMessage}>{warningText}</p>}
		</label>
	);
};
export default Input;
