import styles from './Auth.module.scss';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const Auth = () => {
	const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);

	const toggleSignUpMode = () => {
		setIsSignUpMode(!isSignUpMode);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{isSignUpMode ? (
					<RegisterForm handleModeChange={toggleSignUpMode} />
				) : (
					<LoginForm handleModeChange={toggleSignUpMode} />
				)}
			</div>
		</div>
	);
};

export default Auth;
