'use strict'

exports.errorCtl = function(err){
	let error;
	switch(err.code){
	case 400:
		error = new Error('잘못된 요청 정보입니다.');
		error.code = 'E103';
		break;
	case 404:
		error = new Error('정보가 없습니다.');
		error.code = 'E102';
		break;
	default:
		error = new Error('github api 에러 (?)'.replace('?', err.message));
		error.code = 'E100';
	}
	return error;
};
