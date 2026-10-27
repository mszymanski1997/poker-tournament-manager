import styles from './AddTournamentButton.module.scss';
import Button from '../../../../components/shared/Button/Button';
import Modal from '../../../../components/shared/Modal/Modal';
import { useState } from 'react';
import AddTournamentForm from '../AddTournamentForm/AddTournamentForm';

const AddTournamentButton = () => {
	const [isModalFormOpen, setIsModalFormOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsModalFormOpen(true);
	};

	const closeModal = () => {
		setIsModalFormOpen(false);
	};

	return (
		<>
			<Button className={styles.addButton} noMove onClick={openModal}>
				+ Add new tournament
			</Button>

			<Modal isFormModal isOpen={isModalFormOpen} onClose={closeModal}>
				<AddTournamentForm />
			</Modal>
		</>
	);
};

export default AddTournamentButton;
