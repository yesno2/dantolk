'use strict'

const config = {
	type: 'basic',
	username: '',
	password: ''
};

/**
 * library
 **/
const Client = require('github');

//Client 생성
const github = new Client({
	debug: true
});

//인증
github.authenticate(config);

github.authorization.create({
	scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
	note: "what this auth is for",
	note_url: "http://url-to-this-auth-app",
	headers: {
		"X-GitHub-OTP": "two-factor-code"
	}
}, (err, res) =>  {
	err ? console.error(err) : console.log(res.token);
});

//console.log(github.repos);
//console.log(github.repos.getDownloads.toString());

//사용자의 모든 저장소 리스트 가져오기
/*github.repos.getAll({
	affiliation: 'owner,organization_member'
}, (err, res) => {
	typeof err != 'undefined' && err != null ? console.error(err) : (() => {
		res.forEach((repo) => {
			//각 저장소의 commit들 가져오기
			github.repos.getCommits({
				user: config.username,
				repo: repo.name
			}, (err, res) => {
				typeof err != 'undefined' && err != null ? console.error(err) : (() => {
					console.log('repository name : ', repo.name);
					console.log('repository commits : ', res);
				})();
			});

			github.repos.getDownloads({
				user: config.username,
				repo: repo.name
			}, (err, res) => {
				typeof err != 'undefined' && err != null ? console.error(err) : (() => {
				})();
			});
		});
	})();
});*/

//github.users.get({}, (err, res) => {
//	typeof err != 'undefined' && err != null ? console.error(err) : console.log(res);
//});
