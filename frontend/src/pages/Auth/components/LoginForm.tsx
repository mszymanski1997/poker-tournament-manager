import { Form } from 'react-router-dom';
import styles from '../Auth.module.scss';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { LoginFormData, LoginFormErrors } from '../types';
import { validateLogin } from '../validation';

type LoginFormProps = {
	handleModeChange: () => void;
};

const LoginForm = ({ handleModeChange }: LoginFormProps) => {
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

	const handleChange = (att: keyof LoginFormData, value: string) => {
		setFormData((prev) => {
			return { ...prev, [att]: value };
		});

		if (formErrors[att]) {
			setFormErrors((prev) => ({ ...prev, [att]: undefined }));
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationErrors = validateLogin(formData);

		if (Object.keys(validationErrors).length > 0) {
			setFormErrors(validationErrors);
			return;
		}

		setFormErrors({});

		console.log('Sending data', formData);
	};

	return (
		<>
			<h1 className={styles.title}> Login</h1>

			<Form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputsGroup}>
					<Input
						label='E-mail'
						type='email'
						onChange={(e) => handleChange('email', e.target.value)}
						error={!!formErrors.email}
						warningText={formErrors.email}
					/>
					<Input
						label='Password'
						type='password'
						onChange={(e) => handleChange('password', e.target.value)}
						error={!!formErrors.password}
						warningText={formErrors.password}
					/>
				</div>

				<div className={styles.actions}>
					<Button type='submit' size='big'>
						Login
					</Button>
					<Button type='button' size='big' onClick={handleModeChange}>
						Create account
					</Button>
				</div>
			</Form>
		</>
	);
};

export default LoginForm;
