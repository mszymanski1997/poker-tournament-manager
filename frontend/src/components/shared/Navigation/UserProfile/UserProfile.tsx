import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../../api/users';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import Button from '../../Button/Button';
import styles from './UserProfile.module.scss';
import PendingText from '../../PendingText/PendingText';
import ErrorBlock from '../../ErrorBlock/ErrorBlock';

const UserProfile = () => {
	const { userId, logout } = useAuthContext();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUser(userId!),
		enabled: !!userId,
	});

	if (isLoading) return <PendingText text='Loading' />;
	if (isError) return <ErrorBlock text={error.message} />;

	return (
		<li className={styles.userProfile}>
			<span className={styles.userName}>{data.userName}</span>
			<Button onClick={logout}>Logout</Button>
		</li>
	);
};

export default UserProfile;
