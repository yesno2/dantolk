'use strict'

const auth = require('./auth');
const error = require('./error');
const Promise = require('promise');
const queryString = require('querystring');

/**
 * 사용자의 전체 repository 또는 하나의 repository 정보 가져온다.
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * 	@ {String} [repsId] : 찾을 repository의 ID (undefined인 경우 사용자의 전체 repository를 가져옴)
 * @ return
 * 	@ {Array} repositories : repository 또는 사용자의 전체 repository 정보
 * @ error
 * 	@ {Object} err : 인증 실패 또는 정보가 없음 또는 잘못된 요청 정보
 **/

exports.getRepository = function(authInfo, repsId){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			repsId ? github.repos.getById({
				id: repsId
			}, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.repsId = repsId;
						break;
					}
					reject(err);
				}else{
					resolve(res);
				}
			}) : github.repos.getForUser({
				user: authInfo.userName
			}, (err, res) => {
				err ? reject(error.error.errorCtl(err)) : resolve(res);
			});
		}catch(err){
			reject(err);
		}
	});
};

/**
 * 사용자 또는 사용자가 참여한 repository 정보를 가져온다.
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * @ return
 * 	@ {Array} repositories : 사용자 또는 사용자가 참여한  전체 repository 정보
 * @ error
 * 	@ {Object} err : 인증 실패 또는 정보가 없음 또는 잘못된 요청 정보
 **/
exports.getRepositoryAll = function(authInfo){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			github.repos.getAll({}, (err, res) => {
				err ? reject(error.errorCtl(err)) : resolve(res);
			});
		}catch(err){
			reject(err);
		}
	});
};

/**
 * 해당 repository의 전체 branch 정보를 가져온다.
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * 	@ {Object} option : api parameter data
 * 	 @ {String} user : repository 소유자 이름
 * 	 @ {String} repo : repository 이름
 * 	 @ {String} branch : branch 이름
 * @ return
 * 	@ {Array} branches : branch 목록 정보
 * @ error
 * 	@ {Object} err : 인증 실패 또는 정보가 없음 또는 잘못된 요청 정보
 **/
exports.getBranch = function(authInfo, option){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			option.branch ? github.repos.getBranch(option, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.option = option;
						break;
					}
					reject(err);
				}else{
					resolve(res);
				}
			}) : github.repos.getBranches(option, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.option = option;
						break;
					}
					reject(err);
				}else{
					resolve(res);
				}
			});
		}catch(err){
			reject(err);
		}
	});
};

/**
 * repository의 commit 목록 또는 commit 정보를 가져온다.
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * 	@ {Object} option : api parameter data
 * 	 @ {String} user : repository 소유자 이름
 * 	 @ {String} repo : repository 이름
 * 	 @ {String} [sha] : branch 이름
 * 	 @ {Number} [page] : page 번호
 * 	 @ {Number} [per_page] : 한 페이지의 commit 개수 (최대 100, 기본값 30)
 * @ return
 * 	@ {Array} commits
 * 	@ {Object} commit
 **/
exports.getCommit = function(authInfo, option){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			if(option.sha){
				github.repos.getCommit(option, (err, res) => {
					if(err){
						err = error.errorCtl(err);
						switch(err.code){
						case 'E102':
							err.option = option;
							break;
						}
						reject(err);
					}else{
						resolve(res);
					}	
				})
			}else{
				let commits = new Array();
				(function getCommits(option){
					github.repos.getCommits(option, (err, res) => {
						if(err){
							err = error.errorCtl(err);
							switch(err.code){
							case 'E102':
								err.option = option;
								break;
							}
							reject(err);
						}else{
							res.forEach((commit) => {
								commits.push(commit);
							});

							if(res.meta && res.meta.link){
								let link = res.meta.link.split(',').shift();

								let parsedlink = new Object();
								let temp = link.trim().replace(/<|>|;|\"/g, '').replace(/\ /, '&');
								let parsedData = queryString.parse(temp.split('?').pop());
								parsedlink.isNext = parsedData.rel ==  'first' ? false : true;
								parsedlink.page = parsedData.page;
								
								if(parsedlink.isNext){
									option.page = parsedlink.page;
									getCommits(option);
								}else{
									resolve(commits);
								}
							}else{
								resolve(commits);
							}
						}
					});
				})(option);
			}
		}catch(err){
			reject(err);
		}
	});
};

/**
 * repository의 collaborator들의 정보를 가져온다
 * @ params
 * 	@ {Object} authInfo : github 인증 정보
 * 	 @ {String} userName : 사용자 이름
 * 	 @ {String} password : 비밀번호
 * 	@ {Object} option : api parameter data
 * 	 @ {String} user : repository 소유자 이름
 * 	 @ {String} repo : repository 이름
 **/
exports.getCollaborators = function(authInfo, option){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			github.repos.getCollaborators(option, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.option = option;
						break;
					}
					reject(err);
				}else{
					resolve(res);
				}
			});
		}catch(err){
			reject(err);
		}
	});
};
