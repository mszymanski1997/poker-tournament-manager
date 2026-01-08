import LeftBar from './LeftBar';
import RightBar from './RightBar/RightBar';
import CentralPanel from './CenterPanel/CentralPanel';
import Modal from '../../components/shared/Modal/Modal';
import Form from '../../components/shared/Form/Form';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';

const Timer = () => {
	const { isFormModalOpen, closeFormModal } = useTimerSettings();

	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel />
			<RightBar />

			<Modal isOpen={isFormModalOpen} onClose={closeFormModal}>
				<Form title='Custom Settings' />
			</Modal>
		</div>
	);
};

export default Timer;
