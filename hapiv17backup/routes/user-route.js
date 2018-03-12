const Joi = require('joi')
const UserController = require('../controllers/user-controller')
module.exports = [
	{
		method: 'GET',
		path: '/users',
		handler: UserController.list,
		options: {
			auth: 'token_auth',
			description: 'list all users',
			tags: ['api', 'users', 'list'],
			validate: {
				headers: Joi.object({
					'authorization': Joi.string().required()
				}).unknown()
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/users/{id}',
		handler: UserController.get,
		options: {
			auth: 'token_auth',
			description: 'get user by id',
			tags: ['api', 'users', 'get'],
			validate: {
				headers: Joi.object({
					'authorization': Joi.string().required()
				}).unknown(),
				params: {
					id: Joi.string().required()
				}
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/users',
		handler: UserController.create,
		options: {
			auth: false,
			description: 'create user',
			tags: ['api', 'users', 'create'],
			validate: {
				payload: {
					name: Joi.string().required(),
					username: Joi.string().required(),
					email: Joi.string().email().required(),
					password: Joi.string().required(),
					image: Joi.object().keys({
						thumbnail: Joi.string(),
						original: Joi.string(),
					}).optional()
				}
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/login',
		handler: UserController.login,
		options: {
			auth: false,
			description: 'login user',
			tags: ['api', 'users', 'login'],
			validate: {
				payload: {
					email: Joi.string().email().required(),
					password: Joi.string().required(),
				}
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	},
	{
		method: 'PUT',
		path: '/users/{id}',
		handler: UserController.update,
		options: {
			auth: 'token_auth',
			description: 'update user',
			tags: ['api', 'users', 'update'],
			validate: {
				headers: Joi.object({
					'authorization': Joi.string().required()
				}).unknown(),
				params: {
					id: Joi.string().required()
				},
				payload: {
					name: Joi.string().optional(),
					username: Joi.string().optional(),
					email: Joi.string().email().optional(),
					password: Joi.string().optional(),
					image: Joi.object().keys({
						thumbnail: Joi.string(),
						original: Joi.string()
					}).optional()
				}
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	},
	{
		method: 'DELETE',
		path: '/users/{id}',
		handler: UserController.remove,
		options: {
			auth: 'token_auth',
			description: 'remove user by id',
			tags: ['api', 'users', 'remove'],
			validate: {
				headers: Joi.object({
					'authorization': Joi.string().required()
				}).unknown(),
				params: {
					id: Joi.string().required()
				}
			},
			plugins: {
				'hapi-swagger': {
					payloadType: 'form'
				}
			}
		}
	}
];