'use strict'

const GitHubApi = require("github");

const github = new GitHubApi({
	debug: true,
	timeout: 5000
});

github.authenticate({
	type: "basic",
	username: '',
	password: ''
});

//github.users.get({}), (err, res) => {
//	console.log('get!!');
//	err ? console.error(err) : console.log('get : ', res);	
//};

github.repos.getAll({}, (err, repos) => {
	console.log(repos);	
//	console.log(github.repos.getById({id: repos.shift().id}, function (){
//		console.log(arguments);	
//	}));
});
github.repos.getById({id: '60769207'}, (err, repo) => {
	console.log(err, repo);
});
/*
{ id: 60769207,
name: 'Test',
	  full_name: 'yejanghae/Test',
	  owner:
	  { login: 'yejanghae',
id: 15191715,
	avatar_url: 'https://avatars.githubusercontent.com/u/15191715?v=3',
	gravatar_id: '',
	url: 'https://api.github.com/users/yejanghae',
	html_url: 'https://github.com/yejanghae',
	followers_url: 'https://api.github.com/users/yejanghae/followers',
	following_url: 'https://api.github.com/users/yejanghae/following{/other_user}',
	gists_url: 'https://api.github.com/users/yejanghae/gists{/gist_id}',
	starred_url: 'https://api.github.com/users/yejanghae/starred{/owner}{/repo}',
	subscriptions_url: 'https://api.github.com/users/yejanghae/subscriptions',
	organizations_url: 'https://api.github.com/users/yejanghae/orgs',
	repos_url: 'https://api.github.com/users/yejanghae/repos',
	events_url: 'https://api.github.com/users/yejanghae/events{/privacy}',
	received_events_url: 'https://api.github.com/users/yejanghae/received_events',
	type: 'User',
	site_admin: false },
		private: false,
html_url: 'https://github.com/yejanghae/Test',
				  description: '',
				  fork: false,
				  url: 'https://api.github.com/repos/yejanghae/Test',
				  forks_url: 'https://api.github.com/repos/yejanghae/Test/forks',
				  keys_url: 'https://api.github.com/repos/yejanghae/Test/keys{/key_id}',
				  collaborators_url: 'https://api.github.com/repos/yejanghae/Test/collaborators{/collaborator}',
				  teams_url: 'https://api.github.com/repos/yejanghae/Test/teams',
				  hooks_url: 'https://api.github.com/repos/yejanghae/Test/hooks',
				  issue_events_url: 'https://api.github.com/repos/yejanghae/Test/issues/events{/number}',
				  events_url: 'https://api.github.com/repos/yejanghae/Test/events',
				  assignees_url: 'https://api.github.com/repos/yejanghae/Test/assignees{/user}',
				  branches_url: 'https://api.github.com/repos/yejanghae/Test/branches{/branch}',
				  tags_url: 'https://api.github.com/repos/yejanghae/Test/tags',
				  blobs_url: 'https://api.github.com/repos/yejanghae/Test/git/blobs{/sha}',
				  git_tags_url: 'https://api.github.com/repos/yejanghae/Test/git/tags{/sha}',
				  git_refs_url: 'https://api.github.com/repos/yejanghae/Test/git/refs{/sha}',
				  trees_url: 'https://api.github.com/repos/yejanghae/Test/git/trees{/sha}',
				  statuses_url: 'https://api.github.com/repos/yejanghae/Test/statuses/{sha}',
				  languages_url: 'https://api.github.com/repos/yejanghae/Test/languages',
				  stargazers_url: 'https://api.github.com/repos/yejanghae/Test/stargazers',
				  contributors_url: 'https://api.github.com/repos/yejanghae/Test/contributors',
				  subscribers_url: 'https://api.github.com/repos/yejanghae/Test/subscribers',
				  subscription_url: 'https://api.github.com/repos/yejanghae/Test/subscription',
				  commits_url: 'https://api.github.com/repos/yejanghae/Test/commits{/sha}',
				  git_commits_url: 'https://api.github.com/repos/yejanghae/Test/git/commits{/sha}',
				  comments_url: 'https://api.github.com/repos/yejanghae/Test/comments{/number}',
				  issue_comment_url: 'https://api.github.com/repos/yejanghae/Test/issues/comments{/number}',
				  contents_url: 'https://api.github.com/repos/yejanghae/Test/contents/{+path}',
				  compare_url: 'https://api.github.com/repos/yejanghae/Test/compare/{base}...{head}',
				  merges_url: 'https://api.github.com/repos/yejanghae/Test/merges',
				  archive_url: 'https://api.github.com/repos/yejanghae/Test/{archive_format}{/ref}',
				  downloads_url: 'https://api.github.com/repos/yejanghae/Test/downloads',
				  issues_url: 'https://api.github.com/repos/yejanghae/Test/issues{/number}',
				  pulls_url: 'https://api.github.com/repos/yejanghae/Test/pulls{/number}',
				  milestones_url: 'https://api.github.com/repos/yejanghae/Test/milestones{/number}',
				  notifications_url: 'https://api.github.com/repos/yejanghae/Test/notifications{?since,all,participating}',
				  labels_url: 'https://api.github.com/repos/yejanghae/Test/labels{/name}',
				  releases_url: 'https://api.github.com/repos/yejanghae/Test/releases{/id}',
				  deployments_url: 'https://api.github.com/repos/yejanghae/Test/deployments',
				  created_at: '2016-06-09T11:20:24Z',
				  updated_at: '2016-06-09T11:20:24Z',
				  pushed_at: '2016-06-09T11:20:25Z',
				  git_url: 'git://github.com/yejanghae/Test.git',
				  ssh_url: 'git@github.com:yejanghae/Test.git',
				  clone_url: 'https://github.com/yejanghae/Test.git',
				  svn_url: 'https://github.com/yejanghae/Test',
				  homepage: null,
				  size: 0,
				  stargazers_count: 0,
				  watchers_count: 0,
				  language: null,
				  has_issues: true,
				  has_downloads: true,
				  has_wiki: true,
				  has_pages: false,
				  forks_count: 0,
				  mirror_url: null,
				  open_issues_count: 0,
				  forks: 0,
				  open_issues: 0,
				  watchers: 0,
				  default_branch: 'master',
				  permissions: { admin: true, push: true, pull: true } }*/
