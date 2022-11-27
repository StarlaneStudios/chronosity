import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { expectMethod, expectValues, handleError } from '../../utils';
import { User } from '../../models/user';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');

		const { email, password, remember } = expectValues(req, [
			'email', 'password', 'remember'
		]);

		// Find the user profile
		const user = await User.findOne({ email });

		if(!user) {
			res.sendStatus(401);
			return;
		}

		// Compare hashed passwords
		const valid = await compare(password, user.password);

		if(!valid) {
			res.sendStatus(401);
			return;
		}

		// Update the session
		req.session.userId = user._id;

		if(remember) {
			req.session.cookie.maxAge = 2628000000;
		}

		res.json(user.serialize());
	} catch(err) {
		handleError(err, res);
	}
}