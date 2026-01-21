import { Outlet } from 'react-router-dom';
import DesktopNav from './Desktop/DesktopNav';
import MobileNav from './Mobile/MobileNav';
import { useState, useEffect } from 'react';

const Navigation = () => {
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 900);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			{isMobile ? <MobileNav /> : <DesktopNav />}
			<Outlet />
		</>
	);
};

export default Navigation;
