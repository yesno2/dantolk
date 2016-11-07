'use strict'

const validation = require('../validation');
const github = require('../model/github');

exports.file = require('./file');
exports.repos = require('./repos');
exports.user = require('./user');
exports.login = function(id, password){
	validation.generic.checkUndefinedOrNull(id, 'id');
	validation.generic.checkUndefinedOrNull(password, 'password');
	github.auth(id, password);
};
