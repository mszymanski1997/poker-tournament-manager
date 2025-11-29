import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
	big?: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ big, children, type = 'button', ...props }: ButtonProps) => {
	return (
		<button className={big ? styles.big : ''} type={type} {...props}>
			{children}
		</button>
	);
};

export default Button;
