import { Registry } from "./util/registry";

export interface NavigationItem {
	title: string;
	icon: string;
	path: string;
}

/**
 * The registry of sidebar navigation items
 */
export const navigationItems = new Registry<NavigationItem>();