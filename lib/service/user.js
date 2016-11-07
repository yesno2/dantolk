'use strict'

const github = require('../model/github');
const validation = require('../validation');

exports.getUser = function(authInfo){
	validation.checkAuthInfo(authInfo);
	return github.user.getUser(authInfo);
};
