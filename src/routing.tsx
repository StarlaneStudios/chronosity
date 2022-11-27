import { PageObject } from "./util/meta";

export const layouts: Record<string, PageObject> = {};
export const routes: PageObject[] = [];

export function buildRoutes(): PageObject[] {
	for (const id of Object.keys(layouts)) {
		layouts[id].children = layouts[id].children || [];
	}

	for (const route of routes) {
		const layout = route.handle?.layout ?? 'default';

		layouts[layout]?.children?.push(route);
	}

	return [{
		children: Object.values(layouts),
		handle: {
			title: 'Chronosity'
		}
	}];
}
