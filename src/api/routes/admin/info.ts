import { Request, Response } from 'express';
import { expectAdmin, expectMethod, handleError } from '../../utils';

import { User } from '../../models/user';
import { Event } from '../../models/event';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'GET');
		expectAdmin(res);

		// Fetch the members
		const users = await User.find();

		// Fetch statistics
		const regularShifts = await Event.count({ type: 'regular-shift' });
		const tentativeShifts = await Event.count({ type: 'tentative-shift' });
		const focusShifts = await Event.count({ type: 'focus-shift' });
		const vacations = await Event.count({ type: 'vacation' });

		res.json({
			users: users.map(user => user.serialize()),
			statistics: {
				regularShifts,
				tentativeShifts,
				focusShifts,
				vacations
			}
		});
	} catch(err) {
		console.log(err);
		handleError(err, res);
	}
}