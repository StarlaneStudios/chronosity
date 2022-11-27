import session from 'express-session';
import bodyParser from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import { User } from './models/user';

const app = express();
const secret = process.env.AUTH_SECRET;
const isProduction = process.env.NODE_ENV === 'production';
const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/Chronosity';

if(!secret) {
	throw new Error('AUTH_SECRET environment variable is not set');
}

// Connect to the database
connect(databaseURL);

// Apply security middleware
if(isProduction) {
	app.set('trust proxy', true);
	app.use(helmet({ contentSecurityPolicy: false }));
	app.use(cors({ origin: process.env.BASE_URL }));
}

// Apply session handling middleware
app.use(bodyParser.json());
app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: databaseURL
	}),
	cookie: {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction
	}
}));

// Fetch user for each request
app.use(async (req, res, next) => {
	if(req.session.userId === undefined) {
		next();
		return;
	}

	const user = await User.findById(req.session.userId);

	if(user) {
		res.locals.user = user;
		next();
	} else {
		req.session.destroy(next);
	}
});

module.exports = app;