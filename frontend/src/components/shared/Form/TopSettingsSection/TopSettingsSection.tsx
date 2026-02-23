import { usePokerSettings } from '../../../../store/PokerSettings/usePokerSettings';
import Input from '../../Input/Input';
import styles from './TopSettingsSection.module.scss';

const TopSettingsSection = () => {
	const { settings, validationErrors, updateOneSetting } = usePokerSettings();

	return (
		<>
			<div className={styles.separator}>
				<Input
					label='Starting stack'
					onChange={(e) => updateOneSetting('startingStack', +e.target.value)}
					value={settings.startingStack}
					error={!!validationErrors.startingStack}
					warningText={validationErrors.startingStack}
					id='startingStack'
				/>
				<Input
					label='Buy-In value:'
					onChange={(e) => updateOneSetting('buyInValue', +e.target.value)}
					value={settings.buyInValue}
					error={!!validationErrors.buyInValue}
					warningText={validationErrors.buyInValue}
					id='buyInValue'
				/>
			</div>

			<div className={styles.separator}>
				<Input
					label='Buy-ins:'
					onChange={(e) => updateOneSetting('buyIns', +e.target.value)}
					value={settings.buyIns}
					error={!!validationErrors.buyIns}
					warningText={validationErrors.buyIns}
					id='buyIns'
				/>
				<Input
					label='Rebuys:'
					onChange={(e) => updateOneSetting('rebuys', +e.target.value)}
					value={settings.rebuys}
					error={!!validationErrors.rebuys}
					warningText={validationErrors.rebuys}
					id='rebuys'
				/>
			</div>

			<Input
				label='Players-In:'
				onChange={(e) => updateOneSetting('playersIn', +e.target.value)}
				value={settings.playersIn}
				error={!!validationErrors.playersIn}
				warningText={validationErrors.playersIn}
				id='playersIn'
			/>
		</>
	);
};

export default TopSettingsSection;
