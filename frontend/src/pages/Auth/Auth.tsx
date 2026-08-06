import { Form } from 'react-router-dom';
import styles from './Auth.module.scss';
import Input from '../../components/shared/FormElements/Input';
import Button from '../../components/shared/Button/Button';
import { useState } from 'react';

const Auth = () => {
	const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>{isSignUpMode ? 'Sign up' : 'Login'}</h1>

				<Form className={styles.form}>
					<div className={styles.inputsGroup}>
						{isSignUpMode && <Input label='Username' type='text' />}
						<Input label='E-mail' type='email' />
						<Input label='Password' type='password' />
						{isSignUpMode && <Input label='Confirm password' type='password' />}
					</div>

					<div className={styles.actions}>
						<Button type='submit' size='big'>
							{isSignUpMode ? 'Sign Up' : 'Login'}
						</Button>
						<Button
							type='button'
							size='big'
							onClick={() => setIsSignUpMode(!isSignUpMode)}
						>
							{isSignUpMode ? 'Already signed in?' : 'Create account'}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Auth;
