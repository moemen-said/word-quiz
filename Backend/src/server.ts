import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import App from './app';

const app = express();
const server = new App(app);
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`API server is listining on port ${port}`);
}).on('error', (err: any) => {
	console.log('An error occurred : ', err);
});
