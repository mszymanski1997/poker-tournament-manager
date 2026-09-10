import styles from './ErrorBlock.module.scss';

type ErrorBlockProps = {
	text: string;
	className?: string;
};

const ErrorBlock = ({ text, className = '' }: ErrorBlockProps) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

export default ErrorBlock;
