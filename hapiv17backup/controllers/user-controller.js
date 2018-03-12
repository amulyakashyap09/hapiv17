const Users = require('../models/user-model');
const Lib = require('../lib');


/**
 * List Users
 */
exports.list = (req, h) => {
	return Users.find({}).exec().then((users) => {

		return {users: users};

	}).catch((err) => {

		return {err: err};

	});
}

/**
 * Get User by ID
 */
exports.get = (req, h) => {

	return Users.findById(req.params.id).exec().then((user) => {

		if (!user) return {message: 'User not Found'};

		return {user: user};

	}).catch((err) => {
		return {err: err};
	});
}


/**
 * POST a User
 */
exports.create = (req, h) => {

	const userData = {
		name: req.payload.name,
		username: req.payload.username,
		email: req.payload.email,
		password: Lib.encrypt(req.payload.password),
		image: req.payload.image
	};

	return Users.create(userData).then((user) => {

		return {message: "User created successfully", user: user};

	}).catch((err) => {

		return {err: err};

	});
}

/*
 * Post a login
 * */
exports.login = (req, h) => {

	const criteria = {
		email: req.payload.email,
	};

	return Users.find(criteria).exec().then((user) => {

		if (!user || user.length <= 0) return {message: 'User not Found', statusCode: 401};
		user = JSON.parse(JSON.stringify(user[0]));
		if (!Lib.decrypt(req.payload.password, user.password)) return {message: 'Invalid email or password', statusCode: 400};

		user.token = Lib.generate_token(user);
		return {message: "User login success", user: user};

	}).catch((err) => {

		return {err: err};

	});
}

/**
 * PUT | Update User by ID
 */
exports.update = (req, h) => {

	return Users.findById(req.params.id).exec().then((user) => {

		if (!user) return {err: 'User not found'};

		let dataToUpdate = {};
		if ("name" in req.payload) {
			dataToUpdate["name"] = req.payload.name;
		}
		if ("username" in req.payload) {
			dataToUpdate["username"] = req.payload.username;
		}
		if ("email" in req.payload) {
			dataToUpdate["email"] = req.payload.email;
		}
		if ("image" in req.payload) {
			dataToUpdate["image"] = req.payload.image;
		}

		user.update({
			_id: req.params.id
		}, dataToUpdate, {
			lean: true,
			new: true
		});

	}).then((data) => {

		return {
			message: "User data updated successfully",
			data: data
		};

	}).catch((err) => {

		return {err: err};

	});
}

/**
 * Delete User by ID
 */
exports.remove = (req, h) => {

	return Users.findById(req.params.id).exec(function (err, user) {

		if (err) return {error: err};
		if (!user) return {
			message: 'User not found',
			statusCode: 400
		};

		user.remove(function (err) {
			if (err) return {error: err};
			return {success: true};
		});
	});
};