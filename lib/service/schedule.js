'use strict'

const dao = require('../model/dao');
const validation = require('validation');

exports.addSchedule = function(schedule){
	return dao.scheduleDao.insertSchedule(schedule);
};

//delete schedule(id, userId, repsId, date)
exports.deleteSchedule = function(criteria){
	return dao.schedule.deleteSchedule(criteria);
};

//update schedule(id)
exports.updateSchedule = function(schedule){
	return dao.schedule.updateSchedule(schedule);	
};

//search schedule(id, date, repsId, userId)
exports.getSchedule = function(criteria){
	return dao.schedule.getSchedule(criteria);	
};
