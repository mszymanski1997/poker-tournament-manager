import type {
	RegisterFormData,
	RegisterFormErrors,
	LoginFormData,
	LoginFormErrors,
} from './types';

export const validateRegister = (
	data: RegisterFormData,
): RegisterFormErrors => {
	const errors: RegisterFormErrors = {};
	const { userName, email, password, confirmPassword } = data;

	if (!userName.trim()) {
		errors.userName = 'Username is required';
	}

	if (!email.trim()) {
		errors.email = 'E-mail is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = 'Please enter a valid e-mail address.';
	}

	if (!password) {
		errors.password = 'Password is required';
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters long.';
	}

	if (!confirmPassword) {
		errors.confirmPassword = 'Please confirm your password';
	} else if (confirmPassword !== password) {
		errors.confirmPassword = 'Passwords do not match.';
	}

	return errors;
};

export const validateLogin = (data: LoginFormData): LoginFormErrors => {
	const errors: RegisterFormErrors = {};
	const { email, password } = data;

	if (!email.trim()) {
		errors.email = 'E-mail is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = 'Please enter a valid e-mail address.';
	}

	if (!password) {
		errors.password = 'Password is required';
	}

	return errors;
};
