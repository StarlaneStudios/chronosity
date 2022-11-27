import { Request, Response } from 'express';
import { User } from '../../models/user';
import { expectAuthenticated, expectMethod, handleError } from '../../utils';

const themes = [
	'light',
	'dark'
];

const timeFormats = [
	'24h',
	'12h'
];

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'PATCH');
		expectAuthenticated(res);

		const { name, timezone, theme, timeFormat } = req.body;
		
		// Find the user profile
		const user = await User.findById(req.session.userId);

		if(!user) {
			res.sendStatus(401);
			return;
		}

		let modified = false;

		// Update the name
		if(name !== undefined && typeof name == 'string') {
			user.name = name;
			modified = true;
		}

		// Update the timezone
		if(timezone !== undefined && typeof timezone == 'string' || timezone == null) {
			user.timezone = timezone;
			modified = true;
		}

		// Update the theme
		if(theme !== undefined && themes.includes(theme)) {
			user.theme = theme;
			modified = true;
		}

		// Update the time format
		if(timeFormat !== undefined && timeFormat.includes(timeFormat)) {
			user.timeFormat = timeFormat;
			modified = true;
		}

		const updated = await user.save();

		res.json({
			success: true,
			modified: modified,
			user: updated.serialize()
		});
	} catch(err) {
		handleError(err, res);
	}
}