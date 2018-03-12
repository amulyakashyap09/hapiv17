'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
	name: {type: String, required: true, index: {unique: true}},
	username: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	image: {
		thumbnail: {type: String, default: null},
		original: {type: String, default: null}
	}
}, {
	timestamp: true
});

module.exports = mongoose.model('User', model, 'users');