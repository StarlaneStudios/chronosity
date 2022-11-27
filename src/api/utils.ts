import { Request, Response } from 'express';
import { StatusError } from './routes/error';

/**
 * Expect the request to be of the given method
 * 
 * @param req The request
 * @param method The method to expect
 */
export function expectMethod(req: Request, method: string) {
	if(req.method != method) {
		throw new Error(`Expected method ${method}, got ${req.method}`);
	}
}

/**
 * Expect the given parameters in the request
 * 
 * @param req The request
 * @param params The parameters to expect
 * @returns The request values
 */
export function expectParameters(req: Request, params: string[]): any {
	const missing = params.filter(v => req.query[v] === undefined);
	
	if (missing.length > 0) {
		throw new Error(`Missing required query parameters: ${missing.join(', ')}`);
	}

	return req.query;
}

/**
 * Expect the given values in the request body
 * 
 * @param req The request
 * @param values The values
 * @returns The request values
 */
export function expectValues(req: Request, values: string[]): any {
	const missing = values.filter(v => req.body[v] === undefined);
	
	if (missing.length > 0) {
		throw new Error(`Missing required body values: ${missing.join(', ')}`);
	}

	return req.body;
}

/**
 * Expect the request sender to be authenticated
 * 
 * @param res The response
 */
export function expectAuthenticated(res: Response) {
	if(!res.locals.user) {
		throw new StatusError(401);
	}
}

/**
 * Expect the request sender to be an administrator
 * 
 * @param res The response
 */
export function expectAdmin(res: Response) {
	if(!res.locals.user || !res.locals.user.isAdmin) {
		throw new StatusError(401);
	}
}

/**
 * Returns whether the given type is recognised
 * 
 * @param type Event type
 * @returns True if recognised, false otherwise
 */
export function isValidType(type: string): boolean {
	return [
		'regular-shift',
		'tentative-shift',
		'focus-shift',
		'vacation'
	].includes(type);
}

/**
 * Handle an error in a connection
 * 
 * @param err The error
 * @param res The connectionresponse
 */
export function handleError(err: any, res: Response) {
	if(err instanceof StatusError) {
		res.sendStatus(err.statusCode);
	} else {
		console.error(err);
		
		res.status(400).send({
			error: err.message
		});
	}
}