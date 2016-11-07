'use strict'

const service = require('../lib/service');
const express = require('express');
const router = express.Router();

/*router.get('/', (req, res, next) => {
	res.end('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Insert title here</title></head><body> <form action="/file" method="post" enctype="multipart/form-data">repsId <input type="text" name="repsId"><p>file :<input type="file" name="myfile1"><input type="file" name="myfile2"><input type="submit" value="Upload"></form></body></html>');	
});*/

function errorCtl(err, req, res){
	if(err.responseCode == 404){
		res.writeHead(404);
		err = err.err;
	}else{
		res.writeHead(500);
	}
	res.setHeader('ContentType', 'application/json');
	res.send(err);
}

router.post('/file', (req, res) => {
	service.file.saveFile(req).then((result) => {
		res.send(true);	
	}).catch((err) => {
		next(err);
	});
}, errorCtl);

router.get('/file/list', (req, res) => {
	try{
		let files = service.file.getFileList(req.query.repsId, req.query.dirPath);
		res.send(files);
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/file', (req, res) => {
	try{
		let filePath = service.file.getFile(req.query.repsId, req.query.targetPath);
		res.download(filePath);
	}catch(err){
		next(err);
	}
}, errorCtl);

router.delete('/file', (req, res, next) => {
	try{
		service.file.deleteFile(req.query.repsId, req.query.targetPath);
		res.send(true);
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/schedule', (req, res, next) => {
	service.schedule.getSchedule(req.params).then((result) => {
		res.send(result);	
	}).catch((err) => {
		next(err);	
	});
}, errorCtl);

router.post('/schedule', (req, res, next) => {
	service.schedule.addSchedule(req.body),then((result) => {
		res.send(result);
	}).catch((err) => {
		next(err);	
	});	
});

router.delete('/schedule', (req, res, next) => {
	service.schedule.deleteSchedule(req.body).then((result) => {
		res.send(result);
	}).catch((err) => {
		next(err);	
	});	
});

router.put('/schedule', (req, res, next) => {
	service.schedule.updateSchedule(req.body).then((result) => {
		res.send(result);	
	}).catch((err) => {
		next(err);	
	});	
});

router.post('/login', (req, res, next) => {
	try{
		service.login(req.body.id, req.body.password);
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/repository', (req, res, next) => {
	try{
		let result = service.repos.getRepository(req.query.authInfo, req.query.option);
		result ? result.then((repositories) => {
			res.send(Array.isArray(repositories) ? repositories.map((repository) => {
				return {
					id: repository.id,
					name: repository.name,
					fullName: repository.full_name,
					owner: repository.owner.login,
					permissions: repository.permissions,
					private: repository.private,
					description: repository.description,
					defaultBranch: repository.default_branch
				};
			}) : {
				id: repositories.id,
				name: repositories.name,
				fullName: repositories.full_name,
				owner: repositories.owner.login,
				permissions: repositories.permissions,
				private: repositories.private,
				description: repositories.description,
				defaultBranch: repositories.default_branch
			});
		}).catch((err) => {
			next(err);
		}) : next();
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/commit', (req, res, next) => {
	try{
		service.repos.getCommit(req.query.authInfo, req.query.option).then((commits) => {
			res.send(commits);
		}).catch((err) => {
			next(err);
		});
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/user', (req, res, next) => {
	try{
		service.user.getUser(req.query).then((user) => {
			res.send({
				id: user.id,
				name: user.id,
				email: user.email,
				login: user.login,
				plan: user.plan,
				type: user.type
			});
		}).catch((err) => {
			next(err);
		});
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/branch', (req, res, next) => {
	try{
		service.repos.getBranch(req.query.authInfo, req.query.option).then((branches) => {
			res.send(branches);
		}).catch((err) => {
			next(err);
		});
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/collaborator', (req, res, next) => {
	try{
		service.repos.getCollaborators(req.authInfo, req.option).then((collaborators) => {
			res.send(collaborators.map((collaborator) => {
				return {
					id: collaborator.id,
					name: collaborator.login,
					type: collaborator.type,
					permissions: collaborator.permissions
				};
			}));
		}).catch((err) => {
			next(err);
		});
	}catch(err){
		next(err);
	}
}, errorCtl);

/*router.get('/participation/:repsId/:userId?', (req, res) => {
});*/

module.exports = exports = router;
