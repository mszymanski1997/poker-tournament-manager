export type AuthContextType = {
	token: string | null;
	userId: string | null;
	isAuthenticated: boolean;
	login: (newToken: string) => void;
	logout: () => void;
};

export type AuthStateType = {
	token: string | null;
	userId: string | null;
};

export type JwtPayload = {
	sub: string;
	email: string;
	exp: number;
	iat: number;
};
