'use strict'

const generic = require('./generic');

exports.checkParticipateConfig = function(participateConfig){
	generic.checkUndefinedOrNull(participateConfig, 'participateConfig');	
	participateConfig.repsId = generic.checkNumber(participateConfig.repsId, 'repsId');
	participateConfig.commitCntConf = generic.checkNumber(participateConfig.commitCntConf, 'commitCntConf');
	participateConfig.significantCntConf = generic.checkNumber(participateConfig.significantCntConf, 'significantCntConf');
	participateConfig.participateConf = generic.checkNumber(participateConfig.participateConf, 'participateConf');
	if(participateConfig.time){
		participateConfig.time = generic.checkBoolean(participateConfig.time, 'time');
	}
}

