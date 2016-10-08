'use strict'

<<<<<<< HEAD
const service = require('../lib/service');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function errorCtl(err, req, res){
	res.writeHead(err.responseCode ? err.responseCode : 500);
	res.send(err.err ? err.err : err);	
}

/*router.get('/?page/:page', (req, res, next) => {
	try{
		res.setHeader('Content-Type', 'text/html');
		res.end(fs.readFileSync(path.join(__dirname, '..', 'views', [req.params.page ? req.params.page : 'index', 'html'].join('.'))));
	}catch(err){
		next({err: err, responseCode: 404});
	}
}, errorCtl);*/

router.post('/file', (req, res, next) => {
	service.file.saveFile(req).then((result) => {
		res.send(true);
	}).catch((err) => {
		next({err: err, responseCode: 500});
	});
}, errorCtl);

router.get('/fileList/:repsId/:dirPath?', (req, res, next) => {
=======
const service = require('../service');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.end('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Insert title here</title></head><body> <form action="/file" method="post" enctype="multipart/form-data">repsId <input type="text" name="repsId"><p>file :<input type="file" name="myfile1"><input type="file" name="myfile2"><input type="submit" value="Upload"></form></body></html>');	
});

router.post('/file', (req, res) => {
	service.file.saveFile(req).then((result) => {
		res.send({result: true});	
	}).catch((err) => {
		res.send({result: false, err: err});
	});
});

router.get('/file/list/:repsId/:dirPath?', (req, res) => {
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
	try{
		let files = service.file.getFileList(req.params.repsId, req.params.dirPath);
		res.send({result: true, files: files});
	}catch(err){
<<<<<<< HEAD
		next(err);
	}
}, errorCtl);

router.get('/file/:repsId/:targetPath', (req, res, next) => {
=======
		res.send({result: false, err: err.message});
	}
});

router.get('/file/:repsId/:targetPath', (req, res) => {
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
	try{
		let filePath = service.file.getFile(req.params.repsId, req.params.targetPath);
		res.download(filePath);
	}catch(err){
<<<<<<< HEAD
		next(err);
	}
}, errorCtl);

router.delete('/file/:repsId/:targetPath?', (req, res, next) => {
	try{
		service.file.deleteFile(req.params.repsId, req.params.targetPath);
		res.send(true);
	}catch(err){
		next(err);
	}
}, errorCtl);

router.get('/schedule', (req, res, next) => {
	service.schedule.getSchedule(req.params).then((result) => {
		res.send(result);	
	})catch((err) => {
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

router.get('/participation/:repsId/:userId?', (req, res) => {
	res.send([
		{
			userId: 'user1',
			name: 'name1',
			commit: {
				count: 10,
				percent: 10 / 35
			}, 
			significant: {
				count: 20,
				percent: 20 / 35	
			},
			participate: {
				count: 5,
				percent: 5 / 35	
			},
			total: (10 / 35 + 20 / 35 + 5 / 35) / 3
		},{
			userId: 'user2',
			name: 'name2',
			commit: {
				count: 3,
				percent: 3 / 10 
			}, 
			significant: {
				count: 6,
				percent: 6 / 10	
			},
			participate: {
				count: 1,
				percent: 1 / 10	
			},
			total: (3 / 10 + 6 / 10 + 1 / 10) / 3
		},{
			userId: 'user3',
			name: 'name3',
			commit: {
				count: 15,
				percent: 15 / 30
			}, 
			significant: {
				count: 10,
				percent: 10 / 30	
			},
			participate: {
				count: 5,
				percent: 5 / 30	
			},
			total: (15 / 30 + 10 / 30 + 5 / 30) / 3
		}
	]);	
}, errorCtl);

=======
		res.send({result: false, err});	
	}
});

>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
module.exports = exports = router;
