import dayjs from 'dayjs';
import { User } from '../../models/user';
import { Event } from '../../models/event';
import { Request, Response } from 'express';
import { expectAuthenticated, expectMethod, expectParameters, handleError } from '../../utils';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'GET');
		expectAuthenticated(res);

		const { time } = expectParameters(req, ['time']);

		// Create timeframes
		const weekStart = dayjs(parseInt(time)).startOf('isoWeek');
		const weekEnd = weekStart.add(1, 'week');

		// Fetch events within the timeframe
		const events = await Event.find({
			$or: [
				{
					startTime: {
						$gte: weekStart.toDate()
					}
				},
				{
					endTime: {
						$lte: weekEnd.toDate()
					}
				}
			]
		});

		// Fetch the members
		const members = await User.find();

		res.json({
			members: members.map(user => user.serialize()),
			events: events.map(event => event.serialize())
		});
	} catch(err) {
		handleError(err, res);
	}
}