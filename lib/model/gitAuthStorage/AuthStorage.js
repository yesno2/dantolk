'use strict'
const GitHubApi = require('github');

function *Sequence(){
	let i = 0;
	while(true){
		yield i++;
		if(i == 'Infinity'){
			i = 0;	
		}
	};	
}

function AuthStorage(apiConfig){
	this.gitObjects = new Array();
	this.apiConfig = apiConfig;
}

AuthStorage.prototype.addGitObject = function(config){
	let github = GitHubApi(this.apiConfig);
	github.authenticate({
		type: "basic",
		username: config.username,
		password: config.password
	});
}

module.exports = exports = AuthStorage;
