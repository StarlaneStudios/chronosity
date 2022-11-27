import { useEffect, useState } from "react";
import { Registry, RegistryItem, RegistryMap } from "~/util/registry";

/**
 * Returns a reactively cached version of the given registry
 * 
 * @param registry The registry to cache
 * @returns The cached registry
 */
export function useRegistry<T>(registry: Registry<T>): T[] {
	const [ value, setValue ] = useState(() => registry.toArray());

	useEffect(() => {
		setValue(registry.toArray());
	}, [registry]);

	return value;
}

/**
 * Returns a reactively cached version of the given registry
 * 
 * @param registry The registry to cache
 * @returns The cached registry items
 */
export function useRegistryItems<T>(registry: Registry<T>): RegistryItem<T>[] {
	const [ value, setValue ] = useState(() => registry.toItems());

	useEffect(() => {
		setValue(registry.toItems());
	}, [registry]);

	return value;
}

/**
 * Returns a reactively cached version of the given registry
 * 
 * @param registry The registry to cache
 * @returns The cached registry map
 */
export function useRegistryMap<T>(registry: Registry<T>): RegistryMap<T> {
	const [ value, setValue ] = useState(() => registry.toMap());

	useEffect(() => {
		setValue(registry.toMap());
	}, [registry]);

	return value;
}