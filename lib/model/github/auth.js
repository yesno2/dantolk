'use strict'

const fs = require('fs');
const path = require('path');
const GitHubApi = require("github");

let config;
try{
	config = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'config', 'githubAPIConfig.json'));
}catch(err){
	config = {debug: true};
}

exports.auth = function(authInfo){
	let github = new GitHubApi(config);
	try{
		github.authenticate({
			type: "basic",
			username: authInfo.userName,
			password: authInfo.password
		});
	}catch(err){
		let error;
		switch(err.code){
		case 401:
			switch(err.status){
			case 'Unauthorized':
				error = new Error('github 인증 실패');
				error.code = 'E101';
				error.inputId = authInfo.userName;
				error.inputPassword = authInfo.password;
				break;
			}
			break;
		default:
			error = new Error('github api 에러 (?)'.replace('?', err.message));
			error.code = 'E100';
		}
		throw error;
	}

	return github;
};
