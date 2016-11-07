'use strict'

const auth = require('./auth');
const error = require('./error');
const Promise = require('promise');

exports.getUser = function(authInfo){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			github.users.getForUser({
				user: authInfo.userName
			}, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.userName = authInfo.userName;
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

exports.getUserOrgs = function(authInfo){
	return new Promise((resolve, reject) => {
		try{
			let github = auth.auth(authInfo);
			github.orgs.getForUser({
				user: authInfo.userName,
				per_page: 100
			}, (err, res) => {
				if(err){
					err = error.errorCtl(err);
					switch(err.code){
					case 'E102':
						err.userName = authInfo.userName;
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
