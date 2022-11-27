import { completeLoader, registerLoader } from "./util/loader";

/**
 * Initialize the client by fetching required information
 */
export async function initializeClient() {
	registerLoader('init');
	completeLoader('init');
}