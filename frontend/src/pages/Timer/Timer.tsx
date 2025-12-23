import LeftBar from './LeftBar';
import RightBar from './RightBar/RightBar';
import CentralPanel from './CenterPanel/CentralPanel';
import { useState } from 'react';
import Modal from '../../components/shared/Modal/Modal';
import Form from '../../components/shared/Form/Form';

const Timer = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel onOpenSettings={() => setIsOpen(true)} />
			<RightBar />

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<Form title='Custom Settings' />
			</Modal>
		</div>
	);
};

export default Timer;
