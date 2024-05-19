import { createServer } from 'http';
import express from 'express';
import next from 'next';
import compression from 'compression';
import zlib from 'zlib';
import Bluebird from 'bluebird';

import pkg from '../package.json';
import nextConfig from '../next.config';
import logger from './logger';
import middleware from './middleware';

const Server = () => {
	const port = parseInt(process.env.PORT, 10) || 3000;
	const env = process.env.NODE_ENV;
	const dev = env !== 'production';
	const nextApp = next({ dir: './app', dev, conf: nextConfig });
	const handle = nextApp.getRequestHandler();

	const app = Object.assign(express(), {
		pkgname: pkg.name,
		version: pkg.version
	});

	app.use(compression({ threshold: 0, level: zlib.Z_BEST_COMPRESSION }));

	app.get('/up', middleware.healthCheck);
	app.get('/', (req, res) => nextApp.render(req, res, '/home', req.query));
	app.get('*', (req, res) => handle(req, res));

	const server = createServer(app);

	const listen = () =>
		nextApp
			.prepare()
			.then(() => server.listen(port))
			.then(() => logger.serverStart(env, pkg.name, pkg.version, 'http://localhost', port));

	const close = () => Bluebird.fromCallback(cb => server.close(cb));

	return Object.freeze({
		listen,
		close
	});
};

export default Server;
