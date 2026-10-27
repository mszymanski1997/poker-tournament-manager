import styles from '../../../../components/shared/Form/TopSettingsSection/TopSettingsSection.module.scss';
import Input from '../../../../components/shared/FormElements/Input';
import CurrencySelect from '../../../../components/shared/FormElements/CurrencySelect';

const TopSettings = () => {
	return (
		<>
			<div className={styles.separator}>
				<Input label='Name' id='name' type='text' />
				<Input label='Starting stack:' id='startingStack' />
			</div>

			<div className={styles.separator}>
				<Input label='Buy-in-value:' id='buyInValue' />
				<CurrencySelect label='Choose currency' />
			</div>
		</>
	);
};
export default TopSettings;
