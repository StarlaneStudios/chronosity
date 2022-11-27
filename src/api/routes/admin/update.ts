import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../../models/user';
import { expectAdmin, expectMethod, expectParameters, handleError } from '../../utils';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'PATCH');
		expectAdmin(res);

		const { id } = expectParameters(req, [ 'id' ]);
		const { email, name, password, isAdmin } = req.body;
		
		// Find the user profile
		const user = await User.findById(id);

		if(!user) {
			res.sendStatus(404);
			return;
		}

		let modified = false;

		// Update the email
		if(email !== undefined && typeof email == 'string') {
			user.email = email;
			modified = true;
		}

		// Update the name
		if(name !== undefined && typeof name == 'string') {
			user.name = name;
			modified = true;
		}

		// Update the password
		if(password !== undefined && typeof password == 'string') {
			const passwordHash = await hash(password, 7);

			user.password = passwordHash;
			modified = true;
		}

		// Update the admin status
		if(isAdmin !== undefined && typeof isAdmin == 'boolean') {
			user.isAdmin = isAdmin;
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