import type { SelectHTMLAttributes } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

type CurrencySelectProps = {
	label: string;
	isWorkingWithBackend: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

const CurrencySelect = ({
	label,
	isWorkingWithBackend,
	...props
}: CurrencySelectProps) => {
	return (
		<label className='label'>
			<span>{label}</span>
			<div className='selectWrapper'>
				<select className='select' {...props}>
					{isWorkingWithBackend ? (
						<>
							<option value='USD'>USD</option>
							<option value='EUR'>EUR</option>
							<option value='GBP'>GBP</option>
							<option value='PLN'>PLN</option>
							<option value='CZK'>CZK</option>
						</>
					) : (
						<>
							<option value='$'>USD</option>
							<option value='€'>EUR</option>
							<option value='£'>GBP</option>
							<option value='zł'>PLN</option>
							<option value='Kč'>CZK</option>
						</>
					)}
				</select>
				<MdKeyboardArrowDown className='arrow' />
			</div>
		</label>
	);
};

export default CurrencySelect;
