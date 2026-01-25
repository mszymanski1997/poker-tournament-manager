import LeftBar from './LeftBar';
import RightBar from './RightBar/RightBar';
import CentralPanel from './CenterPanel/CentralPanel';
import Modal from '../../components/shared/Modal/Modal';
import Form from '../../components/shared/Form/Form';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';
import { useSubmit } from '../../hooks/useSubmit';

const Timer = () => {
	const { isFormModalOpen } = useTimerSettings();
	const checkErrors = useSubmit();

	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel />
			<RightBar />

			<Modal isOpen={isFormModalOpen} onClose={checkErrors} isFormModal>
				<Form title='Custom Settings' />
			</Modal>
		</div>
	);
};

export default Timer;
