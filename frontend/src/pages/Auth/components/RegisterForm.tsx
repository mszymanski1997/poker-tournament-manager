import { Form } from 'react-router-dom';
import styles from '../Auth.module.scss';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from '../types';
import { validateRegister } from '../validation';
import { register } from '../http';

type RegisterFormProps = {
	handleModeChange: () => void;
};

const RegisterForm = ({ handleModeChange }: RegisterFormProps) => {
	const [formData, setFormData] = useState<RegisterFormData>({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

	const handleChange = (att: keyof RegisterFormData, value: string) => {
		setFormData((prev) => {
			return { ...prev, [att]: value };
		});

		if (formErrors[att]) {
			setFormErrors((prev) => ({ ...prev, [att]: undefined }));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationErrors = validateRegister(formData);

		if (Object.keys(validationErrors).length > 0) {
			setFormErrors(validationErrors);
			return;
		}

		setFormErrors({});
	};

	return (
		<>
			<h1 className={styles.title}>Register</h1>

			<Form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputsGroup}>
					<Input
						label='Username'
						type='text'
						onChange={(e) => handleChange('userName', e.target.value)}
						error={!!formErrors.userName}
						warningText={formErrors.userName}
					/>

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

					<Input
						label='Confirm password'
						type='password'
						onChange={(e) => handleChange('confirmPassword', e.target.value)}
						error={!!formErrors.confirmPassword}
						warningText={formErrors.confirmPassword}
					/>
				</div>

				<div className={styles.actions}>
					<Button type='submit' size='big'>
						Sign Up
					</Button>
					<Button type='button' size='big' onClick={handleModeChange}>
						Already signed in?
					</Button>
				</div>
			</Form>
		</>
	);
};

export default RegisterForm;
