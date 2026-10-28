import styles from '../../../../components/shared/Form/TopSettingsSection/TopSettingsSection.module.scss';
import Input from '../../../../components/shared/FormElements/Input';
import CurrencySelect from '../../../../components/shared/FormElements/CurrencySelect';
import { useSavedTournament } from '../../store/useSavedTournament';

const TopSettings = () => {
	const { updateOneSetting } = useSavedTournament();

	return (
		<>
			<div className={styles.separator}>
				<Input
					label='Name'
					id='name'
					type='text'
					onChange={(e) => updateOneSetting('name', e.target.value)}
				/>
				<Input
					label='Starting stack:'
					id='startingStack'
					onChange={(e) => updateOneSetting('startingStack', e.target.value)}
				/>
			</div>

			<div className={styles.separator}>
				<Input
					label='Buy-in-value:'
					id='buyInValue'
					onChange={(e) => updateOneSetting('buyIn', e.target.value)}
				/>
				<CurrencySelect
					isWorkingWithBackend={true}
					label='Choose currency'
					onChange={(e) => updateOneSetting('currency', e.target.value)}
				/>
			</div>
		</>
	);
};
export default TopSettings;
