import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, id, type = 'number', ...props }: InputProps) => {
	return (
		<label htmlFor={id} className={styles.label}>
			<span>{label}</span>
			<input
				type={type}
				min='0'
				id={id}
				{...props}
				className={styles.formInput}
			/>
		</label>
	);
};

export default Input;
