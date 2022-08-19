const { validationResult } = require('express-validator');
import { RequestHandler } from 'express';

const validation: RequestHandler = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const message = result.errors.reduce(
			(current: any, error: any) => current + error.msg + ', ', ''
		);
		const error = new Error(message);
		throw error;
	}
	next();
};

export default validation;
