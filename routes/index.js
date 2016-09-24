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
		res.send({result: false, err});	
	}
});

module.exports = exports = router;
