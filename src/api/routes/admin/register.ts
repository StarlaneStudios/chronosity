import { Request, Response } from 'express';
import {  hash } from 'bcrypt';
import { expectAdmin, expectMethod, expectValues, handleError } from '../../utils';
import { User } from '../../models/user';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');
		expectAdmin(res);
	
		const { email, password, name } = expectValues(req, [
			'email', 'password', 'name'
		]);

		const passwordHash = await hash(password, 7);
		
		const user = new User({
			email: email,
			password: passwordHash,
			isAdmin: false,
			name: name,
			theme: 'light',
			timeFormat: '24h'
		});

		await user.save();

		res.json(user.serialize());
	} catch(err) {
		handleError(err, res);
	}
}