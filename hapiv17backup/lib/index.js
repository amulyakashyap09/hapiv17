const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = "zaxqscwdvefbrgnthmyjukiplo";

exports.encrypt = (password)=> {
	return bcrypt.hashSync(password, salt);
};

exports.decrypt = (plain_password, hash)=> {
	return bcrypt.compareSync(plain_password, hash);
};

exports.generate_token = (payload)=> {
	return jwt.sign({
		data: payload
	}, secret, {expiresIn: '1h'})
}

exports.verify_token = (token)=> {
	try {
		return jwt.verify(token, secret);
	} catch (err) {
		console.log("token err : ", err)
		throw new Error(err)
	}
};