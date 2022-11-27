import { combineReducers, configureStore, Reducer, ReducersMapObject, Slice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { loaderReducer } from "./loader";
import { profileReducer } from "./profile";
import { apiReducer } from "./api";
import { clientReducer } from "./client";

export interface KeyedReducer<T = any> {
	key: string;
	fn: Reducer<T>;
}

// List of all available core reducers. Runtime reducers may
// be added to this later by extensions.
const reducers: ReducersMapObject = {};

registerReducer(loaderReducer);
registerReducer(profileReducer);
registerReducer(apiReducer);
registerReducer(clientReducer);

/**
 * The store is used to store and retrieve global
 * application state relevant to the entire client.
 */
export const store = configureStore({
	reducer: reducers
});

/**
 * Register a new reducer to the store
 * 
 * @param reducer The keyed reducer to register
 */
export function registerReducer(reducer: KeyedReducer) {
	if (reducers[reducer.key]) {
		throw new Error(`Reducer with id ${reducer.key} already exists`);
	}

	reducers[reducer.key] = reducer.fn;
}

/**
 * Update the store with the current list of reducers
 */
export function updateStore() {
	store.replaceReducer(combineReducers(reducers));
}

/**
 * Define a new reducer given a store slice and key id
 * 
 * @param id The reducer id
 * @param slice The slice to use as the reducer
 * @returns The keyed reducer
 */
export function defineReducer<T>(id: string, slice: Slice<T>): KeyedReducer<T> {
	return {
		key: id,
		fn: slice.reducer
	};
}

/**
 * Retrieve a reducer's state from the store
 * 
 * @param reducer 
 * @returns 
 */
export function getStoreValue<T>(reducer: KeyedReducer<T>) {
	return store.getState()[reducer.key] as T;
}

/**
 * Hook variant of {@link getStoreValue} which accepts a
 * selector function.
 * 
 * @param reducer The keyed reducer
 * @param selector The selector function
 * @returns The selected state
 */
export function useStoreValue<T, R>(reducer: KeyedReducer<T>, selector: (state: T) => R): R {
	return useSelector<any>(state => selector(state[reducer.key])) as R;
}