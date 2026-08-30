import { Form } from 'react-router-dom';
import styles from '../Auth.module.scss';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { LoginFormData, LoginFormErrors } from '../types';
import { validateLogin } from '../validation';
import { useMutation } from '@tanstack/react-query';
import { login } from '../http';
import PendingText from '../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../components/shared/ErrorBlock/ErrorBlock';

type LoginFormProps = {
	handleModeChange: () => void;
};

const LoginForm = ({ handleModeChange }: LoginFormProps) => {
	const { mutate, isPending, isError, error, reset } = useMutation({
		mutationFn: (data: LoginFormData) => login(data),
		onSuccess: (data) => {
			console.log('Login successful, received token:', data.accessToken);
		},
	});

	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

	const handleChange = (att: keyof LoginFormData, value: string) => {
		if (isError) {
			reset();
		}

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
		mutate(formData);

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
					{isError && <ErrorBlock text={error.message} />}
					<Button type='submit' size='big' disabled={isPending}>
						{isPending ? <PendingText text='Signing in' /> : 'Login'}
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
