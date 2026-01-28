import styles from './Header.module.scss';
import { Outlet } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const Header = () => {
	return (
		<>
			<header className={styles.header}>
				<FaClock className={styles.icon} />
				<h2 className={styles.headerTitle}>Poker Tournament Timer</h2>
			</header>
			<Outlet />
		</>
	);
};

export default Header;
