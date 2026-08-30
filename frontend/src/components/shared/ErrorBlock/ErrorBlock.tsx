import styles from './ErrorBlock.module.scss';

type ErrorBlockProps = {
	text: string;
};

const ErrorBlock = ({ text }: ErrorBlockProps) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

export default ErrorBlock;
