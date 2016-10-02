'use strict'

const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const Promise = require('promise');
const mime = require('mime');

const filePath = path.join(__dirname, '..', '..', 'public', 'files');

function makeRepsFilePath(repsId){
	return path.join(filePath, typeof repsId == 'number' ? repsId + '' : repsId);
}

exports.saveFile = function(req){
	return new Promise((resolve, reject) => {
		let repsId;
		let form = new multiparty.Form();
		let repsFilePath;
	
		form.on('field', (name, value) => {
			switch(name.toLowerCase()){
			case 'repsid':
				repsId = value;
				repsFilePath = makeRepsFilePath(repsId);
				try{
					fs.statSync(repsFilePath);
				}catch(err){
					try{
						fs.mkdirSync(repsFilePath);
					}catch(err){
						reject(err.message);	
					}
				}
				break;		
			}
		}).on('part', (part) => {
			let filename;
			let size;
			if (part.filename) {
				filename = part.filename;
				size = part.byteCount;
			}else{
				part.resume();
			}
			    
			let writeStream = fs.createWriteStream(path.join(repsFilePath, filename));
			part.pipe(writeStream);
			
			part.on('end', () => {
				writeStream.end();
			}).on('error', (err) => {
				reject(err.message);
			});
		}).on('error', (err) => {
			reject(err.message);	
		}).on('close', () => {
			resolve(true);
		});
	
		form.parse(req);
	});
};

exports.getFileList = function(repsId, dirPath){
	let _dirPath = makeRepsFilePath(repsId);
	if(dirPath){
		_dirPath = path.join(_dirPath, dirPath);	
	}
	let files = fs.readdirSync(_dirPath);
	let result = new Array();

	files.forEach((file) => {
		let tempFilePath = path.join(_dirPath, file);
		let stat = fs.statSync(tempFilePath);
		let fileInfo = {filePath: path.join(typeof repsId == 'number' ? repsId + '' : repsId, file)};
		fileInfo.isDir = stat.isDirectory() ? true : false;
		result.push(fileInfo);
	});

	return result;
};

exports.getFile = function(repsId, targetPath){
	let targetFilePath = path.join(makeRepsFilePath(repsId), targetPath);
	fs.statSync(targetFilePath);
	return targetFilePath;
};

function deleteDir(targetPath){
	let files = fs.readdirSync(targetPath);
	files.forEach((file) => {
		let subFilePath = path.join(targetPath, file);
		let stat = fs.statSync(subFilePath);
		stat.isDirectory() ? deleteDir(subFilePath) : fs.unlinkSync(subFilePath);
	});
	fs.rmdirSync(targetPath);
}

exports.deleteFile = function(repsId, targetPath){
	let targetFilePath = path.join(makeRepsFilePath(repsId), targetPath);
	let stat = fs.statSync(targetFilePath);
	stat.isDirectory() ? deleteDir(targetFilePath) : unlinkSynck(targetFilePath);
};
