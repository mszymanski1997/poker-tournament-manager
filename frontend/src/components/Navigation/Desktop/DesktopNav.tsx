import styles from './DesktopNav.module.scss';
import { NavLink } from 'react-router-dom';

const DesktopNav = () => {
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
						<li>
							<NavLink
								to='table-settings'
								className={({ isActive }) => (isActive ? styles.active : '')}
							>
								Table settings
							</NavLink>
						</li>
						<li>
							<NavLink
								to='tournament-settings'
								className={({ isActive }) => (isActive ? styles.active : '')}
							>
								Tournament's settings
							</NavLink>
						</li>
					</div>

					<li className={styles.authLink}>
						<NavLink
							to='auth'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Sign up
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default DesktopNav;
