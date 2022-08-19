import { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import Routes from './routes';

export default class App {
	constructor(app: Application) {
		this.config(app);
	}

	public config(app: Application): void {
		app.use(json());
		app.use(helmet());
		app.use(cors());

		new Routes(app);

		// not found middleware
		app.use((req, res, next) => {
			res.status(404).json({ success: false, message: 'your request url is NOT FOUND' });
		});

		// error middleware
		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			res.json({ success: false, message: err.message });
		});
	}
}
