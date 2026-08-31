import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import UserProfile from '../UserProfile/UserProfile';
import styles from './DesktopNav.module.scss';
import { NavLink } from 'react-router-dom';

const DesktopNav = () => {
	const { isAuthenticated } = useAuthContext();

	return (
		<>
			<nav className={styles.nav}>
				<ul>
					<div className={styles.links}>
						<li>
							<NavLink
								to='/'
								className={({ isActive }) => (isActive ? styles.active : '')}
							>
								Timer
							</NavLink>
						</li>

						{isAuthenticated && (
							<li>
								<NavLink
									to='saved-tournaments'
									className={({ isActive }) => (isActive ? styles.active : '')}
								>
									Saved tournaments
								</NavLink>
							</li>
						)}
					</div>

					{isAuthenticated ? (
						<UserProfile />
					) : (
						<li className={styles.authLink}>
							<NavLink
								to='auth'
								className={({ isActive }) => (isActive ? styles.active : '')}
							>
								Auth
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default DesktopNav;
