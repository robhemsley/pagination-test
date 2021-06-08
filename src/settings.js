/* @flow */

const environment = process.env.ENVIRONMENT
	? process.env.ENVIRONMENT
	: 'development';

export default {
	environment: environment,
	mongoDbUrl: 'mongodb://4.tcp.ngrok.io:17092',
};
