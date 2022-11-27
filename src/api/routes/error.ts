export class StatusError extends Error {

	public statusCode: number;

	public constructor(code = 400) {
		super('StatusError: ' + code);
		this.statusCode = code;
	}

}