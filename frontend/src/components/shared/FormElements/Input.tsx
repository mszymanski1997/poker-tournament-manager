import type { InputHTMLAttributes } from 'react';

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
		<div className='wrapper'>
			<label className='label'>
				<span>{label}</span>

				<input
					type={type}
					min={minValue}
					className={`input ${error ? 'warningBackground' : 'normalInput'}`}
					{...props}
				/>
			</label>
				<p className='warningMessage'>{error ? warningText : '\u00A0'}</p>
		</div>
	);
};
export default Input;
