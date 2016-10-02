'use strict'

exports.getCommitAverage = function(total, count) {
	return count / total;              
}

exports.getSignificantAverage = function(total, count) {
	return count / total;              
}

exports.getParticipateAverage = function(total, count) {
	return count / total;
}

exports.getTotalAverage = function(commitAverage, significantAverage, participateAverage, config){
	let totalAverageWithWeight;
	if(config){
		totalAverageWithWeight = (commitAverage * config.commitCntConf + significantAverage * config.significantCntConf + participateAverage * config.participateCntConf) / (config.commitCntConf + config.significantCntConf + config.participateCntConf);
		if(config.time){
			totalAverageWithWeight *= config.time;
		}
	}else{
		totalAverageWithWeight = (commitAverage + significantAverage + participateAverage) / 3;
	}

	return totalAverageWithWeight;
}
