import { usePokerSettings } from '../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';

const LeftBar = () => {
	const { settings } = usePokerSettings();
	const { upcomingLevel } = useTimerSettings();

	const renderNextBlind = () => {
		if (!upcomingLevel) return 'Game Over';
		if (upcomingLevel.type === 'blind') {
			return `${upcomingLevel.bigBlind} / ${upcomingLevel.smallBlind}`;
		}
		if (upcomingLevel.type === 'break') return 'BREAK';
	};

	return (
		<div className='leftBar'>
			<ul>
				<li>
					<span className='label'>Next Blinds:</span>
					<span className='value'>{renderNextBlind()}</span>
				</li>
				<li>
					<span className='label'>Buy-ins:</span>
					<span className='value'>{settings.buyIns}</span>
				</li>
				<li>
					<span className='label'>Rebuys:</span>{' '}
					<span className='value'>{settings.rebuys}</span>
				</li>
				<li>
					<span className='label'>Total chips:</span>
					<span className='value'>{settings.totalChips}</span>
				</li>
				<li>
					<span className='label'>Averege stack:</span>
					<span className='value'>{settings.averageStack}</span>
				</li>
			</ul>
		</div>
	);
};

export default LeftBar;
