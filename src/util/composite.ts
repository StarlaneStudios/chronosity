/**
 * A composite allows the delegation of a
 * call to multiple sub functions.
 */
export interface Composite {

	/** Invoke this composite */
	(): void;

	/**
	 * Add a sub function to this composite
	 */
	add(...handle: (() => any)[]): void

	/**
	 * Remove a function from this composite
	 */
	remove(handle: () => any): void

}

/**
 * Create a new composite instance
 */
export function composite(): Composite {
	const items: any[] = [];

	return Object.assign(() => {
		for(const item of items) {
			item();
		}
	}, {
		add(...value: (() => any)[]) {
			items.push(...value);
		},
		remove(value: () => any) {
			items.splice(items.indexOf(value), 1);
		}
	});
}