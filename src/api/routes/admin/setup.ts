import { Request, Response } from 'express';
import {  hash } from 'bcrypt';
import { expectMethod, expectValues, handleError } from '../../utils';
import { User } from '../../models/user';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');
	
		const { email, password, name } = expectValues(req, [
			'email', 'password', 'name'
		]);

		// Lock setup once an account is made
		const users = await User.count();

		if(users > 0) {
			res.sendStatus(403);
			return;
		}

		const passwordHash = await hash(password, 7);
		const user = new User({
			email: email,
			password: passwordHash,
			isAdmin: true,
			name: name,
			theme: 'light',
			timeFormat: '24h'
		});

		const created = await user.save();
		
		// Update the session
		req.session.userId = created.id;
		req.session.cookie.maxAge = 2628000000;

		res.json(user.serialize());
	} catch(err) {
		handleError(err, res);
	}
}