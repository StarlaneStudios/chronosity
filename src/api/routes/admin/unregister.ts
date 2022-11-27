import { Request, Response } from 'express';
import { expectAdmin, expectMethod, expectValues, handleError } from '../../utils';
import { User } from '../../models/user';

export default async function (req: Request, res: Response) {
	try {
		expectMethod(req, 'POST');
		expectAdmin(res);
	
		const { id } = expectValues(req, [
			'id'
		]);

		const user = await User.findById(id);

		if(!user) {
			res.sendStatus(404);
			return;
		}

		await user.delete();

		res.json({ success: true });
	} catch(err) {
		handleError(err, res);
	}
}