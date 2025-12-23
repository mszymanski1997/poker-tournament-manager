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
					Boolean
			  )
			: [payouts];

	return (
		<div className='rightBar'>
			<ul>
				<BreakTimerCounter />

				<li>
					Current level: <span>{currentBlindIndex}</span>
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

				<li>
					Payouts:
					<span>
						{payoutArray?.map((amount, index) => (
							<div key={index}>
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
