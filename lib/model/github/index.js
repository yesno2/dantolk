'use strict'

exports.repos = require('./repos');
exports.auth = require('./auth');
exports.user = require('./user');
exports.errorCtl = function(err){
	let error = new Error();
	switch(err.code){
	case 400:
		error.code = 'E102';
		error.message = '잘못된 요청 정보입니다.';
		break;
	case 404:
		error.code = 'E102';
		error.message = '잘못된 요청 정보입니다.';
		break;
	default:
		error = 'E100';
		error.massage = 'github api 에러 (?)'.replace('?', err.message);
	}
	return error;
};
