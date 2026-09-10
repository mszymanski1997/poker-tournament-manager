import styles from './PendingText.module.scss';

type PendingTextProps = {
	text: string;
	className?: string;
};

const PendingText = ({ text, className = '' }: PendingTextProps) => {
	return (
		<span className={`${styles.wrapper} ${className}`}>
			{text}
			<span className={styles.dots}>
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</span>
		</span>
	);
};

export default PendingText;
