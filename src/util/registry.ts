import { objectify } from "radash";

export type RegistryMap<T> = Record<string, RegistryItem<T>>;

export interface RegistryItem<T> {
	id: string;
	content: T;
	weight: number;
}

/**
 * The registry interface defines a service in which
 * items may be registered and ordered based on weight.
 */ 
export class Registry<T> {

	private items: { [key: string]: RegistryItem<T> } = {};

	/**
	 * Register a new item in the registry with a weight.
	 * 
	 * @param id The unique identifier
	 * @param weight The weight value
	 * @param value The item value
	 */
	public register(id: string, weight: number, value: T): T;

	/**
	 * Register a new item in the registry.
	 * 
	 * @param id The unique identifier
	 * @param value The item value
	 */
	public register(id: string, value: T): T;

	public register(id: string, valueOrWeight: number|T, value?: T): T {
		let itemValue: T;
		let weight = 0;

		if (typeof valueOrWeight === 'number') {
			weight = valueOrWeight;
			itemValue = value!;
		} else {
			itemValue = valueOrWeight;
		}

		if(this.contains(id)) {
			throw new Error(`Duplicate registry key "${id}"`);
		}

		this.items[id] = {
			id: id,
			weight: weight,
			content: itemValue
		};
		
		return itemValue;
	}

	/**
	 * Unregister an existing item by its
	 * unique identifier.
	 * 
	 * @param id The unique identifier
	 */
	public unregister(id: string): T | undefined {
		const value = this.get(id);

		delete this.items[id];

		return value;
	}

	/**
	 * Test whether the registry contains an
	 * item with the given identifier.
	 * 
	 * @param id The unique identifier
	 */
	public contains(id: string): boolean {
		return !!this.items[id];
	}

	/**
	 * Returns a registered registry value by
	 * its unique identifier.
	 * 
	 * @param id The unique identifier
	 */
	public get(id: string): T | undefined {
		return this.items[id]?.content;
	}

	/**
	 * Returns the first entry in the registry.
	 */
	public getFirst(): RegistryItem<T> | undefined {
		return this.toItems()[0];
	}

	/**
	 * Returns the last entry in the registry.
	 */
	public getLast(): RegistryItem<T> | undefined {
		const items = this.toItems();

		return items[items.length - 1];
	}

	/**
	 * Returns whether the registry is empty
	 * 
	 * @returns Boolean
	 */
	public isEmpty(): boolean {
		return Object.keys(this.items).length === 0;
	}

	/**
	 * Returns the items currently present within
	 * the map, including their id and weight.
	 * 
	 * @returns The array view
	 */
	public toItems(): RegistryItem<T>[] {
		return Object.values(this.items).sort((a, b) => a.weight - b.weight);
	}

	/**
	 * Convert the contents of this registry in
	 * an array sorted by the weight values of
	 * each registry item.
	 * 
	 * @returns The array view
	 */
	public toArray(): T[] {
		return this.toItems().map(item => item.content);
	}

	/**
	 * Returns a dictionary view of the currently
	 * present items.
	 * 
	 * @returns The map of registry items
	 */
	public toMap(): RegistryMap<T> {
		return objectify(this.toItems(), item => item.id);
	}

}