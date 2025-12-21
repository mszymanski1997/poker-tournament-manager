import styles from './Form.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useRef } from 'react';
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	const {
		levels,
		addNewLevel,
		removeLevel,
		updateBlindLevel,
		updateBreakLevel,
		getBlindValue,
		getBreakValue,
	} = useTimerSettings();

	const {
		setStartingStack,
		setBuyInValue,
		setBuyInsCount,
		setPlayersInCount,
		setRebuysCount,
		settings,
	} = usePokerSettings();

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}

		console.log(levels);
	}, [levels]);

	return (
		<div ref={containerRef} className={styles.container}>
			<form className={styles.form}>
				<h2 className={styles.title}>{title}</h2>

				<div className={styles.separator}>
					<Input
						label='Starting stack'
						id='starting-stack'
						setSetting={setStartingStack}
						minValue={1}
						value={settings.startingStack}
					/>
					<Input
						label='Buy-In value:'
						id='buy-in-value'
						setSetting={setBuyInValue}
						value={settings.buyInValue}
					/>
				</div>

				<div className={styles.separator}>
					<Input
						label='Buy-ins:'
						id='buy-ins'
						setSetting={setBuyInsCount}
						value={settings.buyIns}
					/>
					<Input
						label='Rebuys:'
						id='rebuys'
						setSetting={setRebuysCount}
						value={settings.rebuys}
					/>
				</div>

				<Input
					label='Players-In:'
					id='players-in'
					setSetting={setPlayersInCount}
					value={settings.playersIn}
				/>

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				{levels.map((level) => {
					if (level.type === 'blind') {
						return (
							<div
								className={styles.blindsSettings}
								key={level.id}
								id={`settings-${level.id}`}
							>
								<Input
									label='Big Blind:'
									id={`big-blind-${level.id}`}
									onChange={(e) => {
										updateBlindLevel(level.id, 'bigBlind', +e.target.value);
									}}
									value={getBlindValue('bigBlind', level.id)}
								/>
								<Input
									label='Small Blind:'
									id={`small-blind-${level.id}`}
									onChange={(e) => {
										updateBlindLevel(level.id, 'smallBlind', +e.target.value);
									}}
									value={getBlindValue('smallBlind', level.id)}
								/>
								<Input
									label='Ante:'
									id={`ante-${level.id}`}
									onChange={(e) => {
										updateBlindLevel(level.id, 'ante', +e.target.value);
									}}
									value={getBlindValue('ante', level.id)}
								/>
								<Input
									label='Duration:'
									id={`duration-${level.id}`}
									onChange={(e) => {
										updateBlindLevel(level.id, 'duration', +e.target.value);
									}}
									value={getBlindValue('duration', level.id)}
								/>
								<Button
									className={styles.xButton}
									onClick={() => removeLevel(level.id)}
								>
									X
								</Button>
							</div>
						);
					}

					return (
						<div
							className={styles.breakSettings}
							key={level.id}
							id={`settings-${level.id}`}
						>
							<Input
								label='Break Duration:'
								id={`break-duration-${level.id}`}
								onChange={(e) => updateBreakLevel(level.id, +e.target.value)}
								value={getBreakValue(level.id)}
							/>
							<Button
								className={styles.xButton}
								onClick={() => removeLevel(level.id)}
							>
								X
							</Button>
						</div>
					);
				})}

				<div className={styles.buttons}>
					<Button
						size='big'
						onClick={() => {
							addNewLevel('blind');
						}}
					>
						Add Blind
					</Button>

					<Button
						size='big'
						onClick={() => {
							addNewLevel('break');
						}}
					>
						Add Break
					</Button>

					<Button size='big'>Save</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
