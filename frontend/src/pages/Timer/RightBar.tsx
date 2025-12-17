import { usePokerSettings } from '../../store/PokerSettings/usePokerSettings';

const RightBar = () => {
	const { settings } = usePokerSettings();

	return (
		<div className='rightBar'>
			<ul>
				<li>
					Current level: <span>1</span>
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
