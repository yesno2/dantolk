'use strict'

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
	try{
		let files = service.file.getFileList(req.params.repsId, req.params.dirPath);
		res.send({result: true, files: files});
	}catch(err){
		res.send({result: false, err: err.message});
	}
});

router.get('/file/:repsId/:targetPath', (req, res) => {
	try{
		let filePath = service.file.getFile(req.params.repsId, req.params.targetPath);
		res.download(filePath);
	}catch(err){
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

/*router.get('/participation/:repsId/:userId?', (req, res) => {
});*/

module.exports = exports = router;
