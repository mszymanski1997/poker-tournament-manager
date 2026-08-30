export type AuthContextType = {
	token: string | null;
	userId: string | null;
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
};
