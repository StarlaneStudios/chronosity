import { Request, Response } from 'express';
import { User } from '../../models/user';
import { expectAuthenticated, expectMethod, handleError } from '../../utils';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'GET');
		expectAuthenticated(res);
	
		// Verify installation is complete
		const users = await User.count();

		if(users == 0) {
			res.sendStatus(503);
			return;
		}

		// Find the user profile
		const user = await User.findById(req.session.userId);

		if(!user) {
			res.sendStatus(401);
			return;
		}
		
		res.json(user.serialize());
	} catch(err) {
		handleError(err, res);
	}
}