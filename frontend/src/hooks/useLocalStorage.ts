export const useLocalStorage = <T>(key: string) => {
	const getValue = (): T | null => {
		try {
			const item = localStorage.getItem(key);
			if (!item) return null;
			return JSON.parse(item);
		} catch {
			return null;
		}
	};

	const getValueWithExpiry = (): T | null => {
		try {
			const item = localStorage.getItem(key);

			if (!item) return null;

			const storedItem = JSON.parse(item);

			if (Date.now() > storedItem.expiryTime) {
				localStorage.removeItem(key);
				return null;
			}

			return storedItem.value;
		} catch {
			return null;
		}
	};

	const setValue = (value: T) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const setValueWithExpiryToLocalStorage = (value: T, minutes: number) => {
		const now = Date.now();

		const item = {
			value,
			expiryTime: now + minutes * 60 * 1000,
		};

		localStorage.setItem(key, JSON.stringify(item));
	};

	return {
		getValue,
		getValueWithExpiry,
		setValue,
		setValueWithExpiry: setValueWithExpiryToLocalStorage,
	};
};
