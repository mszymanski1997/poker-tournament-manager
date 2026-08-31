import { Form } from 'react-router-dom';
import styles from '../Auth.module.scss';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from '../types';
import { validateRegister } from '../validation';
import { register } from '../../../api/auth';
import { useMutation } from '@tanstack/react-query';
import PendingText from '../../../components/shared/PendingText/PendingText';
import ErrorBlock from '../../../components/shared/ErrorBlock/ErrorBlock';

type RegisterFormProps = {
	handleModeChange: () => void;
	handleSuccess: () => void;
};

const RegisterForm = ({
	handleModeChange,
	handleSuccess,
}: RegisterFormProps) => {
	const { mutate, isPending, isError, error, reset } = useMutation({
		mutationFn: (data: RegisterFormData) => register(data),
		onSuccess: () => {
			handleSuccess();
		},
	});

	const [formData, setFormData] = useState<RegisterFormData>({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

	const handleChange = (att: keyof RegisterFormData, value: string) => {
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

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationErrors = validateRegister(formData);

		if (Object.keys(validationErrors).length > 0) {
			setFormErrors(validationErrors);
			return;
		}

		setFormErrors({});
		console.log('działa');

		mutate(formData);
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
					{isError && <ErrorBlock text={error.message} />}
					<Button type='submit' size='big' disabled={isPending}>
						{isPending ? <PendingText text='Signing up' /> : 'Signup'}
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
