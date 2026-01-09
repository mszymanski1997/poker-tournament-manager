import LeftBar from './LeftBar';
import RightBar from './RightBar/RightBar';
import CentralPanel from './CenterPanel/CentralPanel';
import Modal from '../../components/shared/Modal/Modal';
import Form from '../../components/shared/Form/Form';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';
import { useSubmitTopSettings } from '../../hooks/useSubmitTopSettings';

const Timer = () => {
	const { isFormModalOpen } = useTimerSettings();
	const checkErrors = useSubmitTopSettings();

	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel />
			<RightBar />

			<Modal isOpen={isFormModalOpen} onClose={checkErrors}>
				<Form title='Custom Settings' />
			</Modal>
		</div>
	);
};

export default Timer;
