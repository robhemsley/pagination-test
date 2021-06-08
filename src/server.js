/* @flow */

import express from 'express';
import chalk from 'chalk';
import settings from './settings.js';
import routeItems from './routes/items.js';
import bodyParser from 'body-parser';
import { connectToServer } from './mongoUtil';

// Helper functions
// -----------------------------------------------------------------------------
const normalizePort = port => {
	port = parseInt(port, 10);

	if (port >= 0) return port;

	return 8080;
};

const onServerError = error => {
	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error('Requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error('Port already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const initExpress = () => {
	const expressApp = express();

	expressApp.use(bodyParser.urlencoded({ extended: true }));
	expressApp.use('/items', routeItems);

	return Promise.resolve(expressApp);
};

const initDB = expressApp =>
	connectToServer()
		.then(() => Promise.resolve(expressApp))
		.catch(err => {
			console.error('Unable to connect to server', err);
		});

export const start = () =>
	initExpress()
		.then(initDB)
		.then(expressApp => {
			const port = normalizePort(process.argv[2]);
			const portMessage = !process.argv[2]
				? 'Note: You can specify which port to use by running "node server.js [port #]"\n'
				: '';

			const server = expressApp.listen(port, () => {
				console.info(
					'\n' +
						chalk.yellow('------------------------------------------------\n') +
						chalk.yellow('-                   Paginate API               -\n') +
						chalk.yellow('------------------------------------------------\n') +
						'\n' +
						chalk.green(`Environment:     ${settings.environment}\n`) +
						chalk.green(`Port:            ${port}\n`) +
						'\n' +
						portMessage +
						chalk.yellow('------------------------------------------------\n')
				);
			});
			server.on('error', onServerError);
		})
		.catch(error => {
			console.error(error);
			process.exit(1);
		});

if (require.main === module) start();
