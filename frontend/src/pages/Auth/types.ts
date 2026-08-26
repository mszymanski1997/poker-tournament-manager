export type RegisterFormData = {
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type RegisterFormErrors = {
	userName?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

export type LoginFormData = {
	email: string;
	password: string;
};

export type LoginFormErrors = {
	email?: string;
	password?: string;
};
