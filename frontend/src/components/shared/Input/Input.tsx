import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	text: string;
	id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ text, id, type = 'number', ...props }: InputProps) => {
	return (
		<label htmlFor={id} className={styles.label}>
			<span>{text}</span>
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
