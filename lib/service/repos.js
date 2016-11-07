'use strict'

const github = require('../model/github');
const validation = require('../validation');

/**
 * get repository
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * 	@ {Object} [option] : api 옵션
 * 	 @ {String} [repsId] : repository id
 * 	 @ {Boolean} [isAll] : true -> 전체 repository 정보를 가져온다. false -> 내 repository들의 정보를 가져온다.
 **/
exports.getRepository = function(authInfo, option){
	validation.checkAuthInfo(authInfo);
	if(option){
		return 'repsId' in option ? github.repos.getRepository(authInfo, option.repsId) : ('isAll' in option && option.isAll ? github.repos.getRepositoryAll(authInfo) : false);
	}else{
		return github.repos.getRepository(authInfo);
	}
};

exports.getCommit = function(authInfo, option){
	validation.checkAuthInfo(authInfo);
	validation.generic.checkUndefinedOrNull(option, 'option');
	validation.generic.checkUndefinedOrNull(option.user, 'option.user');
	validation.generic.checkUndefinedOrNull(option.repo, 'option.repo');
	return github.repos.getCommit(authInfo, option);
};

exports.getBranch = function(authInfo, option){
	validation.checkAuthInfo(authInfo);
	validation.generic.checkUndefinedOrNull(option, 'option');
	validation.generic.checkUndefinedOrNull(option.user, 'option.user');
	validation.generic.checkUndefinedOrNull(option.repo, 'option.repo');
	return github.repos.getBranch(authInfo, option);
};

exports.getCollaborators = function(authInfo, option){
	validation.checkAuthInfo(authInfo);
	validation.generic.checkUndefinedOrNull(option, 'option');
	validation.generic.checkUndefinedOrNull(option.user, 'option.user');
	validation.generic.checkUndefinedOrNull(option.repo, 'option.repo');
	return github.repos.getCollaborators(authInfo, option);
};
