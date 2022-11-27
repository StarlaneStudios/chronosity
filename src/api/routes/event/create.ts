import { Request, Response } from 'express';
import { expectAuthenticated, expectMethod, expectValues, handleError, isValidType } from '../../utils';
import { Event } from '../../models/event';
import dayjs from 'dayjs';
import { StatusError } from '../error';
import { User } from '../../models/user';
import { Types } from 'mongoose';

function isOverlapping(a: number, b: number, c: number, d: number) {
	return Math.max(a, b) < Math.min(c, d);
}

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');
		expectAuthenticated(res);

		const { fromTime, toTime, type } = expectValues(req, [
			'fromTime', 'toTime', 'type'
		]);

		// Verify authentication
		let authorId: string|undefined;

		if(req.body.target === undefined) {
			authorId = req.session.userId;
		} else {
			if(!res.locals.user.isAdmin) {
				throw new StatusError(401);
			}

			authorId = req.body.target;

			const user = await User.findById(authorId);

			if(!user) {
				throw new StatusError(401);
			}
		}

		// Incorrect type specified
		if(!isValidType(type)) {
			throw new StatusError(400);
		}

		// Check for conflicting events
		const existing = await Event.find({ userId: new Types.ObjectId(authorId) } as any);

		for(const event of existing) {
			if(isOverlapping(fromTime, event.startTime.valueOf(), toTime, event.endTime.valueOf())) {
				res.status(400).json({
					error: "Conflicting event"
				});

				return;
			}
		}

		// Lock setup once an account is made
		const event = new Event({
			startTime: dayjs(parseInt(fromTime)).toDate(),
			endTime: dayjs(parseInt(toTime)).toDate(),
			userId: authorId,
			type: type
		});

		const created = await event.save();

		res.json(created.serialize());
	} catch(err) {
		handleError(err, res);
	}
}