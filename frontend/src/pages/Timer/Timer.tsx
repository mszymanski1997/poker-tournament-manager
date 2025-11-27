import LeftBar from './LeftBar';
import RightBar from './RightBar';
import CentralPanel from './CenterPanel/CentralPanel';

const Timer = () => {
	return (
		<div className='timer'>
			<LeftBar />
			<CentralPanel />
			<RightBar />
		</div>
	);
};

export default Timer;
