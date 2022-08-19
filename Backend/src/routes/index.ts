import { Application } from 'express';
import { body } from 'express-validator';

import { getRank, getWords } from '../controllers/word.controller';
import validationMw from '../middlewares/validationMw';

export default class Routes {
	constructor(app: Application) {
		app.get('/words', getWords);

		app.post(
			'/rank',
			body('score')
				.notEmpty().withMessage('score cannot be empty')
				.isNumeric().withMessage('score must be number'),
			validationMw,
			getRank
		);
	}
}
