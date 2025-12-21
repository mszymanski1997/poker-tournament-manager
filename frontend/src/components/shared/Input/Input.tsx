import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	minValue?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
	label,
	type = 'number',
	minValue = 0,
	...props
}: InputProps) => {
	return (
		<label className={styles.label}>
			<span>{label}</span>
			<input
				type={type}
				min={minValue}
				className={styles.formInput}
				{...props}
			/>
		</label>
	);
};
export default Input;
