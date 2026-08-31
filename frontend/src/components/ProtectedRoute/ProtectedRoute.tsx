import type { ReactNode } from 'react';
import { useAuthContext } from '../../store/AuthContext/useAuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuthContext();

	if (!isAuthenticated) {
		return <Navigate to='/auth' replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
