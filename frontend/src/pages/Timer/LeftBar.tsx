import { usePokerSettings } from '../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';
import { useBlindsFormatter } from '../../hooks/useBlindsFormatter';
import { useGameCalculation } from '../../store/PokerSettings/useGameCalculation';

const LeftBar = () => {
	const { settings } = usePokerSettings();
	const { upcomingLevel } = useTimerSettings();
	const formatBlind = useBlindsFormatter();
	const { totalChips, averageStack } = useGameCalculation();

	const renderNextBlind = () => {
		if (!upcomingLevel) return 'Game Over';
		if (upcomingLevel.type === 'blind') {
			return `${formatBlind(upcomingLevel.bigBlind, 10000)} / ${formatBlind(upcomingLevel.smallBlind, 5000)}`;
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
					<span className='value'>{totalChips}</span>
				</li>
				<li>
					<span className='label'>Averege stack:</span>
					<span className='value'>{averageStack}</span>
				</li>
			</ul>
		</div>
	);
};

export default LeftBar;
