import styles from './WarningContainer.module.scss';
import Button from '../Button/Button';
import type { ReactNode } from 'react';

type WarningContainerProps = {
	questionText: string;
	warningText: string;
	confirmButtonText: string | ReactNode;
	confirmButtonAction: () => void;
	cancelButtonAction: () => void;
	children?: ReactNode;
};

const WarningContainer = ({
	questionText,
	warningText,
	confirmButtonText,
	confirmButtonAction,
	cancelButtonAction,
	children,
}: WarningContainerProps) => {
	return (
		<div className={styles.modalContainer}>
			<h2>{questionText}</h2>

			<div className={styles.warning}>{warningText}</div>

			{children}

			<div className={styles.deletingButtons}>
				<Button onClick={cancelButtonAction}>Cancel</Button>
				<Button onClick={confirmButtonAction} className={styles.buttonDanger}>
					{confirmButtonText}
				</Button>
			</div>
		</div>
	);
};

export default WarningContainer;
