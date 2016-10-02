'use strict'

const dao = require('../model/dao');
const validation = require('../validation');
const github = require('../model/github');
const Promise = require('promise');

exports.addParticipateConfig = function(participateConfig){
	validation.repository.checkParticipateConfig(participateConfig);
	return dao.participateDao.insertParticipateConf(participateConfig);
};

exports.getParticipateConfig = function(repsId){
	repsId = validation.generic.checkNumber(repsId);
	return dao.participateDao.getParticipateConf(repsId);
};

exports.deleteParticipateConfig = function(repsId){
	repsId = validation.generic.checkNumber(repsId);
	return dao.participateDao.deleteParticipateConf(repsId);
};

exports.updateParticipateConfig = function(participateConfig){
	validation.repository.checkParticipateConfig(participateConfig);
	return dao.participateDao.updateParticipateConf(participateConfig);
};

exports.getParticipate = function(authInfo, repsName){
	return new Promise((resolve, reject) => {
		github.repos.getRepositoryAll(authInfo).then((repositorys) => {
			let repository = repositorys.find((repository) => {
				return repository.name == repsName;
			});
			github.repos.getCommit(authInfo, {
				user: repository.owner.login,
				repo: repsName,
				per_page: 100
			}).then((commits) => {
				resolve(commits.length);
			}).catch((err) => {
				reject(err);
			});
		}).catch((err) => {
			reject(err);
		});
	});
};

/*exports.getParticipate({
	userName: '',
	password: ''
}, '').then((res) => {
	console.log(res);
}).catch((err) => {
	console.error(err);
});*/
