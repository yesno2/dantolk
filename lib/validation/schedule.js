'use strict'

const generic = require('./generic');
//id, repsId, startDate, endDate, title, description
exports.checkSchedule = function(schedule){
	generic.checkUndefinedOrNull(schedule, 'schedule');
	generic.checkNumber(schedule.id, 'id');
	generic.checkNumber(repsId, 'repsId');
	generic.checkUndefinedOrNull(description, 'description');
};
