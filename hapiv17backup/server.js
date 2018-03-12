const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Routes = require('./routes');
const mongoose = require('mongoose');
const Lib = require('./lib');
const dbUri = "mongodb://localhost:27017/hapiv17";

(async () => {
	const server = await new Hapi.Server({
		host: 'localhost',
		port: 3000,
	});

	const swaggerOptions = {
		documentationPath: '/docs',
		info: {
			title: 'API Documentation',
			version: Pack.version,
		}
	};

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}, {
			plugin: require('hapi-auth-bearer-token')
		}
	]);

	server.auth.strategy('token_auth', 'bearer-access-token', {
		allowQueryToken: true,
		accessTokenName: 'accessToken',
		validate: async (request, token, h)=> {
			try {
				let output = Lib.verify_token(token);
				return {
					isValid: true, credentials: output, artifacts: token
				};
			} catch (err) {
				console.log("err : ", err)
				throw new Error("name" in err ? err.name : "token error", "message" in err ? err.message : "invalid token!!!", 400);
			}
		}
	});

	try {
		mongoose.connect(dbUri)
		await server.start();
		server.route(Routes);
		console.log('Server running at:', server.info.uri);
	} catch (err) {
		console.log(err);
	}
})();