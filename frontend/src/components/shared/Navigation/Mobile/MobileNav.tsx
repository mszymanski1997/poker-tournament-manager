import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './MobileNav.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../../store/AuthContext/useAuthContext';
import UserProfile from '../UserProfile/UserProfile';

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNav = () => {
		setIsOpen((prev) => !prev);
	};

	const { isAuthenticated } = useAuthContext();

	return (
		<nav className={styles.nav}>
			<div className={styles.iconWrapper} onClick={toggleNav}>
				{isOpen ? (
					<FaTimes className={styles.icon} />
				) : (
					<FaBars className={styles.icon} />
				)}
			</div>

			<ul className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
				<li>
					<Link to='/' onClick={toggleNav}>
						Timer
					</Link>
				</li>

				{isAuthenticated && (
					<li>
						<Link to='saved-tournaments' onClick={toggleNav}>
							Saved tournaments
						</Link>
					</li>
				)}
				{isAuthenticated ? (
					<UserProfile />
				) : (
					<li>
						<Link to='auth' onClick={toggleNav}>
							Auth
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default MobileNav;
