import { Form } from 'react-router-dom';
import styles from './Auth.module.scss';
import Input from '../../components/shared/FormElements/Input';
import Button from '../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { formDataType } from './types';

const Auth = () => {
	const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);

	const [formData, setFormData] = useState<formDataType>({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (att: keyof formDataType, value: string) => {
		setFormData((prev) => {
			return { ...prev, [att]: value };
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>{isSignUpMode ? 'Sign up' : 'Login'}</h1>

				<Form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.inputsGroup}>
						{isSignUpMode && (
							<Input
								label='Username'
								type='text'
								onChange={(e) => handleChange('userName', e.target.value)}
							/>
						)}
						<Input
							label='E-mail'
							type='email'
							onChange={(e) => handleChange('email', e.target.value)}
						/>
						<Input
							label='Password'
							type='password'
							onChange={(e) => handleChange('password', e.target.value)}
						/>
						{isSignUpMode && (
							<Input
								label='Confirm password'
								type='password'
								onChange={(e) =>
									handleChange('confirmPassword', e.target.value)
								}
							/>
						)}
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
