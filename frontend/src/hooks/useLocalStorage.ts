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

	const setValue = (value: T) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	return { setValue, getValue };
};
