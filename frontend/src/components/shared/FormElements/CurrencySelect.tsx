import type { SelectHTMLAttributes } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

type CurrencySelectProps = {
	label: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const CurrencySelect = ({ label, ...props }: CurrencySelectProps) => {
	return (
		<label className='label'>
			<span>{label}</span>
			<div className='selectWrapper'>
				<select className='select' {...props}>
					<option value='$'>USD</option>
					<option value='€'>EUR</option>
					<option value='£'>GBP</option>
					<option value='zł'>PLN</option>
					<option value='Kč'>CZK</option>
				</select>
				<MdKeyboardArrowDown className='arrow' />
			</div>
		</label>
	);
};

export default CurrencySelect;
