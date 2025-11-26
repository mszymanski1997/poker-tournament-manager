import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './MobileNav.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNav = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.iconWrapper} onClick={toggleNav}>
				{isOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
			</div>

			<ul className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
				<li>
					<Link to='/' onClick={toggleNav}>Timer</Link>
				</li>
				<li>
					<Link to='table-settings' onClick={toggleNav}>Table settings</Link>
				</li>
				<li>
					<Link to='tournament-settings' onClick={toggleNav}>Tournament's settings</Link>
				</li>
				<li>
					<Link to='auth' onClick={toggleNav}>Sign up</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MobileNav;
