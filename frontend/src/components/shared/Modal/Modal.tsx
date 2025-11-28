import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null;

	return createPortal(
		<>
			<div className={styles.background} onClick={onClose}></div>
			<div className={styles.modal}>{children}</div>
		</>,
		document.body
	);
};

export default Modal;
