import { Form } from 'react-router-dom';
import styles from '../Auth.module.scss';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/Button/Button';
import { useState, type FormEvent } from 'react';
import type { formDataType } from '../types';

type RegisterFormProps = {
	handleModeChange: () => void;
};

const RegisterForm = ({ handleModeChange }: RegisterFormProps) => {
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
		<>
			<h1 className={styles.title}>Login</h1>

			<Form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputsGroup}>
					<Input
						label='Username'
						type='text'
						onChange={(e) => handleChange('userName', e.target.value)}
					/>

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

					<Input
						label='Confirm password'
						type='password'
						onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
