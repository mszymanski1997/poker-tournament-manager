import { usePokerSettings } from '../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../store/TimerSettings/useTimerSettings';

const RightBar = () => {
	const { settings } = usePokerSettings();
	const { currentIndex } = useTimerSettings();

	return (
		<div className='rightBar'>
			<ul>
				<li>
					Current level: <span>{currentIndex + 1}</span>
				</li>

				<li>
					Players-In:
					<span>
						{settings.playersIn}/{settings.buyIns}
					</span>
				</li>

				<li>
					Total money pot: <span>{settings.totalMoney}</span>
				</li>
			</ul>
		</div>
	);
};

export default RightBar;
