import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	minValue?: number;
	warning?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
	label,
	type = 'number',
	minValue = 0,
	warning = false,
	...props
}: InputProps) => {
	return (
		<label className={styles.label}>
			<span>{label}</span>
			<input
				type={type}
				min={minValue}
				className={`${styles.input} ${
					warning ? styles.warningBackground : styles.normalInput
				}`}
				{...props}
			/>
			{warning && <p className={styles.warningMessage}>warnig text</p>}
		</label>
	);
};
export default Input;
