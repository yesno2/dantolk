'use strict'

const mysql = require('mysql');
const transactionStorage = require('./TransactionStorage');
const connectionPool = require('./ConnectionPool');

function DAO(){}

DAO.prototype.getConnection = function(isTransaction){
	return connectionPool.getConnection(isTransaction);
};

DAO.prototype.close = function(connection, action){
	connectionPool.close(connection, action);
};

DAO.prototype.makeQuery = function(query, parameters){
	return mysql.format(query, parameters);
};

//DAO.prototype.query = function(query, transactionInfo, mapper){
DAO.prototype.query = function(query, transactionInfo){
	let self = this;
	return transactionInfo !== undefined && transactionInfo !== null ? (() => {
		transactionInfo.query = query;
//		if(typeof mapper != 'undefined' && mapper != null){
//			transactionInfo.mapper = mapper;
//		}
		return self.transactionQuery(transactionInfo);
	})() : (() => {
		return new Promise((resolve, reject) => {
			self.getConnection().then((connection) => {
				connection.query(query, (err, result) => {
					err ? reject(err) : resolve(Array.isArray(result) ? result : (result.affectedRows > 0 ? true : false));
					//////////////////////////////////////////
//					err ? reject(err) : resolve(Array.isArray(result) ? (() => {
//						if(typeof mapper != 'undefined' && mapper != null){
//							return mapper(result);
//						}
//						return result;
//					})() : (result.affectedRows > 0 ? true : false));
					////////////////////////////////////
					self.close(connection);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	})();
};

DAO.prototype.endTransaction = function(transactionInfo){
	let self = this;
	return new Promise((resolve, reject) => {
		self.getConnection(true).then((connection) => {
			try{
				let query = transactionStorage.endTransaction(transactionInfo.transactionId, transactionInfo.query);
//				let transaction = transactionStorage.endTransaction(transactionInfo.transactionId, transactionInfo.query, transactionInfo.mapper);
				connection.query(query, (err, results) => {
					if(err){
						reject(err);
						self.close(connection, 'rollback');
						return;
					}
					Array.isArray(results) ? (() => {
						let failedList = new Array();
						results.forEach((result) => {
							if(result.affectedRows <= 0){
								failedList.push(result);
							}
						});
						failedList.length <= 0 ? (() => {
							self.close(connection, 'commit');
							resolve({result: true});
						})() : (() => {
							self.close(connection, 'rollback');
							resolve({result: false, failedList: failedList});
						})();
					})() : (() => {
						self.close(connection, 'commit');
						resolve(results.affectedRows > 0 ? true : false)
					})();
				});
//				if(typeof transaction == 'undefined' || transaction == null){
//					console.error('transaction is not exist');
//					throw new Error('transaction is not exist');
//				}
//				
//				connection.query(transaction.getTransactionQuery(), (err, results) => {
//					if(err){
//						reject(err);
//						self.close(connection, 'rollback');
//						return;
//					}
//					Array.isArray(results) ? (() => {
//						let failedList = new Array();
//						let mappingList = new Array();
//						results.forEach((result, index) => {
//							transaction.querys[index].search(/select/i) > -1 ? (() => {
//								let mapper = transaction.mapper.pop();
//								mappingList.push(mapper(result));
//							})() : (() => {
//								if(result.affectedRows <= 0){
//									failedList.push(transaction.querys[index]);
//								}
//							})();
//						});
//						console.log('failedList : ', failedList);
//						failedList.length <= 0 ? (() => {
//							self.close(connection, 'commit');
//							resolve({result: true, mappingList: mappingList});
//						})() : (() => {
//							self.close(connection, 'rollback');
//							resolve({result: false, failedList: failedList});
//						})();
//					})() : (() => {
//						self.close(connection, 'commit');
//						resolve(results.affectedRows > 0 ? true : false)
//					})();
//				});
			}catch(err){
				console.log('DAO : ', err);
				reject(err);
				self.close(connection, 'rollback');
			}
		}).catch((err) => {
			console.log('DAO : ', err);
			reject(err);
		});
	});
}


DAO.prototype.transactionQuery = function(transactionInfo){
	switch(transactionInfo.action){
	case 'start':
		return transactionStorage.startTransaction(transactionInfo.query);
	case 'add':
		return transactionStorage.addTransaction(transactionInfo.transactionId, transactionInfo.query);
	case 'end':
		return this.endTransaction(transactionInfo);
	default:
		throw new Error('not supported transactionInfo.action (action : ' + transactionInfo.action + ')');
	}
	
//	switch(transactionInfo.action){
//	case 'start':
//		return transactionStorage.startTransaction(transactionInfo.query, transactionInfo.mapper);
//	case 'add':
//		return transactionStorage.addTransaction(transactionInfo.transactionId, transactionInfo.query, transactionInfo.mapper);
//	case 'end':
//		return this.endTransaction(transactionInfo);
//	default:
//		throw new Error('not supported transactionInfo.action (action : ' + transactionInfo.action + ')');
//	}
}

module.exports = exports = DAO;
