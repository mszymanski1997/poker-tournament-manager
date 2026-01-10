import { usePokerSettings } from '../../../../store/PokerSettings/usePokerSettings';
import Input from '../../Input/Input';
import styles from './TopSettingsSection.module.scss';

const TopSettingsSection = () => {
	const {
		settings,
		validationErrors,
		setStartingStack,
		setBuyInValue,
		setBuyInsCount,
		setRebuysCount,
		setPlayersInCount,
	} = usePokerSettings();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setSetting: (value: number) => void,
		minValue: number = 0
	) => {
		const value = Math.max(minValue, +e.target.value);

		setSetting(value);
	};

	return (
		<>
			<div className={styles.separator}>
				<Input
					label='Starting stack'
					onChange={(e) => handleChange(e, setStartingStack, 1)}
					value={settings.startingStack}
					error={!!validationErrors.startingStack}
					warningText={validationErrors.startingStack}
				/>
				<Input
					label='Buy-In value:'
					onChange={(e) => handleChange(e, setBuyInValue)}
					value={settings.buyInValue}
					error={!!validationErrors.buyInValue}
					warningText={validationErrors.buyInValue}
				/>
			</div>

			<div className={styles.separator}>
				<Input
					label='Buy-ins:'
					onChange={(e) => handleChange(e, setBuyInsCount)}
					value={settings.buyIns}
					error={!!validationErrors.buyIns}
					warningText={validationErrors.buyIns}
				/>
				<Input
					label='Rebuys:'
					onChange={(e) => handleChange(e, setRebuysCount)}
					value={settings.rebuys}
				/>
			</div>

			<Input
				label='Players-In:'
				onChange={(e) => handleChange(e, setPlayersInCount)}
				value={settings.playersIn}
				error={!!validationErrors.playersIn}
				warningText={validationErrors.playersIn}
			/>
		</>
	);
};

export default TopSettingsSection;
