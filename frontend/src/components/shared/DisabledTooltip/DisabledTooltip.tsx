import type { ReactNode } from 'react';
import styles from './DisabledTooltip.module.scss';

type DisabledTooltipProps = {
	children: ReactNode;
	isDisabled: boolean;
	text: string;
};

const DisabledTooltip = ({
	children,
	isDisabled,
	text,
}: DisabledTooltipProps) => {
	if (!isDisabled) {
		return <>{children}</>;
	}

	return (
		<div className={styles.wrapper}>
			{children} 
			<span className={styles.tooltip}>{text}</span>
		</div>
	);
};

export default DisabledTooltip;
