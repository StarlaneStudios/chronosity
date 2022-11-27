import { Request, Response } from 'express';
import { expectAuthenticated, expectMethod, handleError } from '../../utils';

export default function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');
		expectAuthenticated(res);

		req.session.destroy(() => {
			res.sendStatus(200);
		});
	} catch(err) {
		handleError(err, res);
	}
}