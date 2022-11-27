import { pick } from "radash";
import { getStoreValue, store, useStoreValue } from "~/store";
import { loaderActions, loaderReducer } from "~/store/loader";

/**
 * Register a new loader to wait for
 * 
 * @param id Loader id
 */
export function registerLoader(id: string) {
	store.dispatch(loaderActions.registerLoader(id));
}

/**
 * Mark the loader as completed
 * 
 * @param id Loader id
 */
export function completeLoader(id: string) {
	store.dispatch(loaderActions.completeLoader(id));
}

/**
 * Returns whether all loaders have been completed
 */
export function useLoadersReady(list: string[]): boolean {
	const loadingMap = pick(
		useStoreValue(loaderReducer, state => state.loading),
		list
	);

	return Object.values(loadingMap).every(Boolean);
}

/**
 * Return a promise to await the specified loading step
 * 
 * @param id The loading step id
 * @returns A promise
 */
export function loadingStep(id: string): Promise<void> {
	const { loading } = getStoreValue(loaderReducer);

	if (loading[id]) {
		return Promise.resolve();
	}

	return new Promise(resolve => {
		const unsub = store.subscribe(() => {
			const { loading } = getStoreValue(loaderReducer);

			if (loading[id]) {
				unsub();
				resolve();
			}
		});
	});
}