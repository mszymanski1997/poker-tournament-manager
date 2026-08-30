import styles from './PendingText.module.scss';

type PendingTextProps = {
	text: string;
};

const PendingText = ({ text }: PendingTextProps) => {
	return (
		<span className={styles.wrapper}>
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
