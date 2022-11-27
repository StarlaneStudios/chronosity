import { expectAuthenticated, expectMethod, expectParameters, handleError } from '../../utils';
import { Request, Response } from 'express';
import { Event } from '../../models/event';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'DELETE');
		expectAuthenticated(res);

		const { id } = expectParameters(req, [ 'id' ]);
		const event = await Event.findById(id);
		const isAdmin = res.locals.user.isAdmin;

		if(!event || (event.userId.toString() !== req.session.userId && !isAdmin)) {
			res.sendStatus(404);
			return;
		}

		await event.delete();

		res.json(event.serialize());
	} catch(err) {
		handleError(err, res);
	}
}