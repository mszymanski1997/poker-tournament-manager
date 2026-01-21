import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import BreakTimerCounter from './BreakTimerCounter';

const RightBar = () => {
	const { settings, setPayouts } = usePokerSettings();
	const { currentBlindIndex } = useTimerSettings();

	const payouts = setPayouts();

	const payoutArray =
		payouts && typeof payouts === 'object'
			? [payouts.first, payouts.second, payouts.third, payouts.fourth].filter(
					Boolean,
				)
			: [payouts];

	return (
		<div className='rightBar'>
			<ul>
				<BreakTimerCounter />

				<li>
					<span className='label'>Current level:</span>
					<span className='value'>{currentBlindIndex}</span>
				</li>

				<li>
					<span className='label'>Players-In:</span>
					<span className='value'>
						{settings.playersIn}/{settings.buyIns}
					</span>
				</li>

				<li>
					<span className='label'>Total money:</span>
					<span className='value'>{settings.totalMoney}</span>
				</li>

				<li className='last-list-element'>
					<span className='label payouts'>Payouts:</span>
					<span>
						{payoutArray?.map((amount, index) => (
							<div key={index} className='value'>
								{typeof payouts !== 'string' ? (
									<>
										<strong>{index + 1}.</strong> {amount}
									</>
								) : (
									payouts
								)}
							</div>
						))}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default RightBar;
