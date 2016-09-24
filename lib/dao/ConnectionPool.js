'use strict'

const Promise = require('promise');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config', 'dbConfig.json')));
const pool = mysql.createPool(config);

exports.getConnection = function(isTransaction){
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			err ? reject(err) : (isTransaction ? connection.beginTransaction((err) => {
				err ? reject(err) : resolve(connection);
			}) : resolve(connection));
		});
	});
};

exports.close = function(connection, action){
	return new Promise((resolve, reject) => {
		if(typeof connection == 'undefined' || connection == null){
			reject(new Error('connection is undefined or null'));
			return;
		}
		try{
			if(typeof action != 'undefined' && action != null){
				switch(action){
				case 'commit':
					connection.commit((err) => {
						if(err){
							throw err;
						}
					});
					break;
				case 'rollback':
					connection.rollback((err) => {
						if(err){
							throw err;
						}
					});
					break;
				default:
					throw new Error('not supported action (action : ' + action + ')');
				}
			}
			resolve(true);
		}catch(err){
			reject(err);
		}finally{
			connection.release();
		}
	});
};
