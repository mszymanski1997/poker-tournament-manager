import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	id: string;
	minValue?: number;
	setSetting?: (value: number) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
	label,
	id,
	setSetting,
	type = 'number',
	minValue = 0,
	...props
}: InputProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!setSetting) return;

		const value = Math.max(minValue, +e.target.value);
		setSetting(value);
	};

	return (
		<label htmlFor={id} className={styles.label}>
			<span>{label}</span>
			<input
				type={type}
				min={minValue}
				id={id}
				className={styles.formInput}
				onChange={setSetting ? handleChange : undefined}
				{...props}
			/>
		</label>
	);
};
export default Input;
