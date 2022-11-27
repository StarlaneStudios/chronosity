// eslint-disable-next-line unused-imports/no-unused-imports
import SessionData from 'express-session';

declare module 'express-session' {
	interface SessionData {

		/**
		 * The unique id of the current signed in user
		 */
		userId: string;
		
	}
}