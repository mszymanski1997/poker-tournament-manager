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
					Next Blinds:
					<span>{renderNextBlind()}</span>
				</li>
				<li>
					Buy-ins: <span>{settings.buyIns}</span>
				</li>
				<li>
					Rebuys: <span>{settings.rebuys}</span>
				</li>
				<li>
					Total chips: <span>{settings.totalChips}</span>
				</li>
				<li>
					Averege stack: <span>{settings.averageStack}</span>
				</li>
			</ul>
		</div>
	);
};

export default LeftBar;
