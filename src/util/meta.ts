import { defineRoute, TreeRouteObject } from "react-router-tree";
import { NonIndexRouteObject } from "react-router-dom";
import { ReactNode } from "react";

/**
 * Additional metadata that may be associated with
 * a page in the client.
 */
export interface PageHandle {
	[key: string]: any;

	/**
	 * sets the container width to full width if true
	 * 
	 * @deprecated currently unused
	 */
	fluid?: boolean;

	/** The optional layout to render around the component */
	layout?: any;
	
	/** The optional title displayed on this page */
	title?: string;

	/** A list of creators provided by this page */
	creators?: CreatorObject[];

	/** The section title given to creators defined by this page */
	creatorSection?: string;

}

/**
 * Props passed to creator components
 */
export interface CreatorProps {
	onReturn: () => void;
	onClose: () => void;
}

/**
 * A creator object that may be associated with a page
 * that allows opening a creation dialog for projects,
 * teams, tasks, etc.
 */
export interface CreatorObject {
	id: string;
	icon: string;
	title: ReactNode;
	description: ReactNode;
	getView(props: CreatorProps): ReactNode;
}

// We extend the RouteObject type to add support
// for including metadata with each route.
export interface PageObject extends NonIndexRouteObject, TreeRouteObject {
	handle?: PageHandle;
	children?: this[];
}

/**
 * Definition function for page objects
 */
export const definePage = defineRoute<PageObject>;