import { Request, Response } from 'express';
import {  expectMethod, expectParameters, handleError, isValidType } from '../../utils';
import { Event } from '../../models/event';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'PATCH');

		const { type } = req.body;
		const { id } = expectParameters(req, [ 'id' ]);
		const event = await Event.findById(id);
		const isAdmin = res.locals.user.isAdmin;

		if(!event || (event.userId.toString() !== req.session.userId && !isAdmin)) {
			res.sendStatus(404);
			return;
		}

		let modified = false;

		// Update the email
		if(type !== undefined && isValidType(type)) {
			event.type = type;
			modified = true;
		}

		const updated = await event.save();

		res.json(updated.serialize());
	} catch(err) {
		handleError(err, res);
	}
}