'use strict'

const DAO = require('./DAO');

const scheduleTable = 'schedule_participate';

const INSERT_SCHEDULE_PARTICIPATE_INFO_QUERY = 'INSERT ??(`schedule_id`, `user_id`) VALUES(?, ?)';
const SELECT_SCHEDULE_PARTICIPATE_INFO_QUERY = 'SELECT `schedule_id` scheduleId, `user_id` userId FROM ??';

function ScheduleParticipateDAO(){
	DAO.call(this);	
}
require('util').inherits(ScheduleParticipateDAO, DAO);

ScheduleParticipateDAO.prototype.insertScheduleParticipate = function(scheduleParticipateInfo, transactionInfo){
	return this.query(this.makeQuery(INSERT_SCHEDULE_PARTICIPATE_INFO_QUERY, [scheduleTable, scheduleParticipateInfo.scheduleId, scheduleParticipateInfo.userId]), transactionInfo);
};

module.exports = exports = new ScheduleParticipateDAO();
