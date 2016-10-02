'use strict'

const DAO = require('./DAO');

const scheduleTable = 'repo_schedule';

const INSERT_REPO_SCHEDULE_QUERY = 'INSERT INTO ??(`reps_id`, `start_date`, `end_date`, `title`, `description`) VALUES(?, ?, ?, ?, ?)';
const SELECT_REPO_SCHEDULE_QUERY = 'SELECT `id`, `reps_id` repsId, `start_date` startDate, `end_date` endDate, `title`, `description` FROM ??';
const UPDATE_REPO_SCHEDULE_QUERY = 'UPDATE ?? SET ??? WHERE `id` = ?';
const DELETE_REPO_SCHEDULE_QUERY = 'DELETE FROM ??';

const scheduleInfoAttrs = {
	id: 'id',
	repsId: 'reps_id',
	startDate: 'start_date',
	endDate: 'end_date',
	title: 'title',
	description: 'description'	
};

function ScheduleDAO(){
	DAO.call(this);	
}
require('util').inherits(ScheduleDAO, DAO);

ScheduleDAO.prototype.insertSchedule = function(schedule, transactionInfo){
	return this.query(this.makeQuery(INSERT_REPO_SCHEDULE_QUERY, [scheduleTable, schedule.repsId, schedule.startDate, schedule.endDate, schedule.title, schedule.description]), transactionInfo);
};

ScheduleDAO.prototype.getSchedule = function(criteria, transactionInfo){
	let parameters = [scheduleTable];
	let tempQuery = new Array();

	for(let attr in criteria){
		tempQuery.push('??' + attr == 'startDate' ? '>=' : (attr == 'endDate' ? '<=' : '=') + '?');
		parameters.push(scheduleInfoAttrs[attr]);
		parameters.push(criteria[attr]);
	}
	return this.query(this.makeQuery(tempQuery.length == 0 ? SELECT_REPO_SCHEDULE_QUERY : SELECT_REPO_SCHEDULE_QUERY.concat(' WHERE ').concat(tempQuery.join(' AND ')), parameters), transactionInfo);
};

ScheduleDAO.prototype.updateSchedule = function(schedule, transactionInfo){
	let parameters = [scheduleTable];
	let tempQuery = new Array();
	for(let attr in schedule){
		if(attr !== 'id' && attr !== 'repsId'){
			tempQuery.push('??=?');
			parameters.push(scheduleInfoAttrs[attr]);
			parameters.push(schedule[attr]);
		}
	}
	parameters.push(schedule.id);
	return this.query(this.makeQuery(UPDATE_REPO_SCHEDULE_QUERY.replace('???', tempQuery.join()), parameters), transactionInfo);
};

ScheduleDAO.prototype.deleteSchedule = function(criteria, transactionInfo){	
	let tempQuery = new Array();
	let parameters = [scheduleTable];
	for(let attr in criteria){
		tempQuery.push('??' + attr == 'startDate' ? '>=' : (attr == 'endDate' ? '<=' : '=') + '?');
		parameters.push(scheduleInfoAttrs[attr]);
		parameters.push(criteria[attr]);
	}
	return this.query(this.makeQuery(DELETE_REPO_SCHEDULE_QUERY.concat(tempQuery.join(' AND ')), parameters), transactionInfo);
};

module.exports = exports = new ScheduleDAO();
/*let schedule = {
	repsId: 0, 
	startDate: new Date(2016, 9, 10, 7),
	endDate: new Date(2016, 9, 10, 8),
	title: 'test',
	description: 'test schedule'
};*/
/*exports.insertSchedule(schedule).then((result) => {
	console.log(result);
}).catch((err) => {
	console.error(err);	
});*/

/*exports.getSchedule().then((result) => {
	console.log(result);
	result.forEach((sch) => {
		console.log((sch.endDate - sch.startDate) / 1000 / 60 / 60);	
	});
}).catch((err) => {
	console.error(err);	
});*/
