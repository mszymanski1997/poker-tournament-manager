import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
	big?: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ big, children, ...props }: ButtonProps) => {
	return (
		<button className={big ? styles.big : ''} {...props}>
			{children}
		</button>
	);
};

export default Button;
