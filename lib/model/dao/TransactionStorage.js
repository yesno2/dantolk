'use strict'

function *sequence(){
	let seq = 0;
	while(true){
		yield seq++;
		if(seq == 'Infinity'){
			seq = 0;
		}
	}
}

const seq = sequence();

function Transaction(transactionId){
	this.transactionId = transactionId;
	this.querys = new Array();
	//////////////////////////////
//	this.mappers = new Array();
	/////////////////////////////
}

Transaction.prototype.addQuery = function(query){
	this.querys.push(query);
};

//////////////////////////
//Transaction.prototype.addMapper = function(mapper){
//	this.mappers.push(mapper);
//};
//////////////////////////

Transaction.prototype.getTransactionQuery = function(){
	return this.querys.join(';');
};

function TransactionStorage(){
	this.transactions = new Array();
}

//TransactionStorage.prototype.startTransaction = function(query, mapper){
TransactionStorage.prototype.startTransaction = function(query){
	let transactionId = seq.next().value;
	let transaction = new Transaction(transactionId);
	
	if(query !== undefined && query !== null){
		transaction.addQuery(query);
	}
//	if(typeof mapper != 'undefined' && mapper != null){
//		transaction.addMapper(mapper);
//	}
	this.transactions.push(transaction);
	return transactionId;
}

TransactionStorage.prototype.getTransaction = function(transactionId, isEnd){
	if(transactionId === undefined || transactionId === null || isNaN(transactionId)){
		throw new Error('transactionId is undefined or null or NaN (TransactionStorage.getTransaction)');
	}

	let transaction = this.transactions.find((transaction) => {
		return transaction.transactionId == transactionId;
	});

	if(transaction === undefined){
		return false;
	}

	if(isEnd){
		let index = this.transactions.findIndex((transaction) => {
			return transaction.transactionId == transactionId;
		});
		this.transactions.splice(index, 1);
	}
	return transactionTarget.getTransactionQuery();
//	return transactionTarget;
}

//TransactionStorage.prototype.endTransaction = function(transactionId, query, mapper){
TransactionStorage.prototype.endTransaction = function(transactionId, query){
	if(query !== undefined && query !== null){
		this.addTransaction(transactionId, query);
	}
//	if((typeof query != 'undefined' && query != null) || (typeof mapper != 'undefined' && mapper != null)){
//		this.addTransaction(transactionId, query, mapper);
//	}
	return this.getTransaction(transactionId, true);
}

//TransactionStorage.prototype.addTransaction = function(transactionId, query, mapper){
TransactionStorage.prototype.addTransaction = function(transactionId, query){
	if(transactionId === undefined || transactionId === null || isNaN(transactionId)){
		throw new Error('transactionId is undefined or null or NaN (TransactionStorage.addTransaction)');
	}
	if(query === undefined || query === null){
		throw new Error('query is undefined or null (TransactionStorage.addTransaction)');
	}

	return this.transactions.some((transaction) => {
		if(transaction.transactionId == transactionId){
			transaction.addQuery(query);
			/////////////////////////////////
//			if(typeof mapper != 'undefined' && mapper != null){
//				transaction.addMapper(mapper);
//			}
			////////////////////////////////
			return true;
		}
	}) ? transactionId : false;
};

module.exports = exports = new TransactionStorage();
