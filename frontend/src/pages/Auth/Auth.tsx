import styles from './Auth.module.scss';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Modal from '../../components/shared/Modal/Modal';
import Button from '../../components/shared/Button/Button';

const Auth = () => {
	const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const toggleSignUpMode = () => {
		setIsSignUpMode(!isSignUpMode);
	};

	const handleRegistrationSuccess = () => {
		setIsSignUpMode(false);
		setShowSuccessModal(true);
	};

	const closeModal = () => {
		setShowSuccessModal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{isSignUpMode ? (
					<RegisterForm
						handleModeChange={toggleSignUpMode}
						handleSuccess={handleRegistrationSuccess}
					/>
				) : (
					<LoginForm handleModeChange={toggleSignUpMode} />
				)}
			</div>

			<Modal isOpen={showSuccessModal} onClose={closeModal}>
				<div className={styles.modalContent}>
					<h2 className={styles.modalTitle}>Account created!</h2>
					<p className={styles.modalText}>
						Your account has been successfully created. You can now log in.
					</p>
					<div className={styles.modalActions}>
						<Button onClick={closeModal} size='big'>
							<p className={styles.buttonText}>Go to Login</p>
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Auth;
