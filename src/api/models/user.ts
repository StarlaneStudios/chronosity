import { model, Model, models, Schema } from "mongoose";
import { createHash } from 'crypto';

export interface UserType {
	email: string;
	name: string;
	avatar: string;
	password: string;
	isAdmin: boolean;
	timezone: string;
	theme: string;
	timeFormat: string;
	serialize(): any;
}

const userSchema = new Schema({
	email: String,
	name: String,
	password: String,
	isAdmin: Boolean,
	timezone: String,
	theme: String,
	timeFormat: String
});

userSchema.methods.serialize = function() {
	const identity = this.email.trim().toLowerCase();
	const avatarHash = createHash('md5').update(identity).digest('hex');

	return {
		id: this._id,
		name: this.name,
		email: this.email,
		theme: this.theme,
		isAdmin: this.isAdmin,
		timezone: this.timezone,
		timeFormat: this.timeFormat,
		avatar: `https://www.gravatar.com/avatar/${avatarHash}?d=retro`
	};
};

export const User: Model<UserType> = models.User || model('User', userSchema);