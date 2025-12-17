import { usePokerSettings } from '../../store/PokerSettings/usePokerSettings';

const LeftBar = () => {
	const { settings } = usePokerSettings();

	return (
		<div className='leftBar'>
			<ul>
				<li>
					Next Blinds: <span>20/10</span>
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
