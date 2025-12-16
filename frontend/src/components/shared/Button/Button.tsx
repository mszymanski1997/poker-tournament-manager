import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
	big?: boolean;
	children: ReactNode;
	size?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ size, children, type = 'button', ...props }: ButtonProps) => {
	return (
		<button className={size === 'big' ? styles.big : ''} type={type} {...props}>
			{children}
		</button>
	);
};

export default Button;
