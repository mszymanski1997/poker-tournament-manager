import LeftBar from './LeftBar';
import RightBar from './RightBar';
import CentralPanel from './CenterPanel/CentralPanel';
import { useState } from 'react';
import Modal from '../../components/shared/Modal/Modal';

const Timer = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel onOpenSettings={() => setIsOpen(true)} />
			<RightBar />

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<p className='test'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
					architecto harum est nobis neque expedita officiis qui illo unde
					corporis vitae perspiciatis tempora, veniam repudiandae suscipit alias
					assumenda animi earum!{' '}
				</p>
			</Modal>
		</div>
	);
};

export default Timer;
