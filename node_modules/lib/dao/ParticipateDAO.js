'use strict'

const DAO = require('./DAO');

const participateConfTable = 'participate_conf';
const participateInfoTable = 'participate_info';

const INSERT_PARTICIPATE_CONF_QUERY = 'INSERT INTO ??(`reps_id`, `commit_cnt_conf`, `participate_cnt_conf`, `significant_cnt_conf`, `time`) VALUES(?, ?, ?, ?, ?)';
const SELECT_PARTICIPATE_CONF_QUERY = 'SELECT `reps_id` repsId, `commit_cnt_conf` commitCntConf, `participate_cnt_conf` participateCntConf, `significant_cnt_conf` significantCntConf, `time` FROM ??';
const UPDATE_PARTICIPATE_CONF_QUERY = 'UPDATE ?? SET ??? WHERE `reps_id` = ? ';
const DELETE_PARTICIPATE_CONF_QUERY = 'DELETE FROM ?? WHERE `reps_id` = ?';

const INSERT_PARTICIPATE_INFO_QUERY = 'INSERT INTO ??(`id`, `reps_id`, `commit_cnt`, `participaint_cnt`, `significant_cnt`) VALUES(?, ?, ?, ?, ?)';
const SELECT_PARTICIPATE_INFO_QUERY = 'SELECT `id`, `reps_id` repsId, `commit_cnt` commitCnt, `participaint_cnt` participateCnt, `significant_cnt` significantCnt FROM ?? WHERE `reps_id` = ?';
const UPDATE_PARTICIPATE_INFO_QUERY = 'UPDATE ?? SET ??? WHERE `id` = ? AND `reps_id` = ?';
const DELETE_PARTICIPATE_INFO_QUERY = 'DELETE FROM ?? WHERE ';

const participateConfAttrs = {
	repsId: 'reps_id',
	commitCntConf: 'commit_cnt_conf',
	participateCntConf: 'participate_cnt_conf',
	significantCntConf: 'significant_cnt_conf'
};

const participateInfoAttrs = {
	id: 'id',
	repsId: 'reps_id',
	commitCnt: 'commit_cnt'	,
	participateCnt: 'participateCnt',
	significantCnt: 'significant_cnt'
};

function ParticipateDAO(){
	DAO.call(this);	
}
require('util').inherits(ParticipateDAO, DAO);

ParticipateDAO.prototype.insertParticipateConf = function(participateConf, transactionInfo){
	return this.query(this.makeQuery(INSERT_PARTICIPATE_CONF_QUERY, [participateConfTable, participateConf.repsId, participateConf.commitCntConf, participateConf.participateCntConf, participateConf.significantCntConf, participateConf.time]), transactionInfo);
};

ParticipateDAO.prototype.updateParticipateConf = function(participateConf, transactionInfo){
	let parameters = [participateConfTable];
	let queryTemp = new Array();

	for(let attr in participateConf){
		if(attr !== 'repsId' && participateConf[attr]){
			queryTemp.push('`' + participateConfAttrs[attr] + '`=?');
			parameters.push(participateConf[attr]);	
		}
	}

	parameters.push(participateConf.repsId);

	let query = UPDATE_PARTICIPATE_CONF_QUERY.replace('???', queryTemp.join());

	return this.query(this.makeQuery(query, parameters), transactionInfo);
};

ParticipateDAO.prototype.deleteParticipateConf = function(repsId, transactionInfo){
	return this.query(this.makeQuery(DELETE_PARTICIPATE_CONF_QUERY, [participateConfTable, repsId]), transactionInfo);
};

ParticipateDAO.prototype.getParticipateConf = function(repsId, transactionInfo){
	let parameters = [participateConfTable];

	let query = SELECT_PARTICIPATE_CONF_QUERY.concat(' WHERE ' + (Array.isArray(repsId) ? '`reps_id` IN(???)'.replace('???', (() => {
		let temp = new Array();
		repsId.forEach((item) => {
			temp.push('?');
			parameters.push(item);
		});
		return temp.join();
	})()) : (() => {
		parameters.push(repsId);
		return '`reps_id`=?';
	})()));

	return this.query(this.makeQuery(query, parameters), transactionInfo).then((result) => {
		if(result){
			result = result.map((element) => {
				element.repsId = parseInt(element.repsId);
				return element;
			});	
		}
		return result;
	});
};

ParticipateDAO.prototype.insertParticipateInfo = function(id, repsId, transactionInfo){
	return this.query(this.makeQuery(INSERT_PARTICIPATE_INFO_QUERY, [participateInfoTable, id, reps_id, 0, 0, 0]), transactionInfo);	
};

ParticipateDAO.prototype.getParticipateInfo = function(criteria, transactionInfo){
	let parameters = [participateInfoTable, criteria.repsId];
	let query = criteria.id ? (() => {
		paramters.push(criteria.id);
		return SELECT_PARTICIPATE_INFO_QUERY.concat(' AND `id`=?');
	})() : SELECT_PARTICIPATE_INFO_QUERY;
	return this.query(this.makeQuery(query, parameters), transactionInfo);
}

ParticipateDAO.prototype.updateParticipateInfoIncrement = function(criteria, transactionInfo){
	let tempQuery = new Array();
	for(let attr in criteria){
		if(attr !== 'id' && attr !== 'repsId'){
			tempQuery.push('`' + participateInfoAttrs[attr] + '` = ' + participateInfoAttrs[attr] + ' + ' + criteria[attr]);
		}
	}
	return this.query(this.makeQuery(UPDATE_PARTICIPATE_INFO_QUERY.replace('???', tempQuery.join(), [participateInfoTable, criteria.id, criteria.repsId])), transactionInfo);
};

ParticipateDAO.prototype.deleteParticipateInfo = function(criteria, transactionInfo){
	let tempQuery = new Array();
	let parameters = [participateInfoTable];
	for(let attr in criteria){
		tempQuery.push(attr + '=?');
		parameters.push(criteria[attr]);
	}
	return this.query(this.makeQuery(DELETE_PARTICIPATE_INFO_QUERY.concat(tempQuery.join(' AND ')), parameters), transactionInfo);
		
}
module.exports = exports = new ParticipateDAO();

//exports.insertParticipateConf({repsId: 0, commitCntConf: 10, participateCntConf: 20, significantCntConf: 30, time: false}).then((result) => {
//	console.log(result);	
//}).catch((err) => {
//	console.error(err);	
//});

//exports.getParticipateConf([0, 1, 2]).then((result) => {
//	console.log(result);	
//}).catch((err) => {
//	console.error(err);	
//});

//exports.deleteParticipateConf(0).then((result) => {
//	console.log(result);	
//}).catch((err) => {
//	console.error(err);	
//});
