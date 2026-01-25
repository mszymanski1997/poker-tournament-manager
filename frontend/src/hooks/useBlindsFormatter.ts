export const useBlindsFormatter = () => {
	
    const formatBlinds = (blind: number, maxValue: number) => {
		if (blind >= 1000000) {
			const dividedBlind = blind / 1000000;
			return `${dividedBlind}M`;
		}

		if (blind >= maxValue) {
			const dividedBlind = blind / 1000;
			return `${dividedBlind}K`;
		}

		return blind;
	};

	return formatBlinds;
};
