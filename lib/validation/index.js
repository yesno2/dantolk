'use strict'

exports.generic = require('./generic');
exports.repository = require('./repository');
exports.schedule = require('./schedule');
exports.checkAuthInfo = function(authInfo){
	exports.generic.checkUndefinedOrNull(authInfo.userName, 'authInfo.userName');
	exports.generic.checkUndefinedOrNull(authInfo.password, 'authInfo.password');
};
