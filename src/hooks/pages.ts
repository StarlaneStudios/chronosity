import { useMatches } from "react-router-dom";
import { PageHandle } from "~/util/meta";
import { deepmerge } from "deepmerge-ts";
import { useMemo } from "react";

/**
 * Compute the fully merged handle data for the current route.
 * 
 * @returns The handle values
 */
export function usePageHandles(): Partial<PageHandle> {
	const pages = useMatches();
	
	return useMemo(() => {
		return deepmerge({}, ...pages.map(page => page.handle));
	}, [pages]);
}