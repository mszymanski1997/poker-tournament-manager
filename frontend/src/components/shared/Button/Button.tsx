import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
	big?: boolean;
	noMove?: boolean;
	children: ReactNode;
	size?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	size,
	children,
	type = 'button',
	noMove = false,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${size === 'big' ? styles.big : ''} ${noMove ? styles.noMove : ''}`}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
