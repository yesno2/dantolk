'use strict'

exports.checkUndefinedOrNull = function(target, targetName){
	if(target === undefined){
		throw new Error('target is undefined'.replace('target', targetName));
	}

	if(target === null){
		throw new Error('target is null'.replace('target', targetName));
	}
};

exports.checkNumber = function(target, targetName){
	exports.checkUndefinedOrNull(target,targetName);
	
	let parsedTarget = parseInt(target.trim());
	if(isNaN(parsedTarget)){
		throw new Error('target not number format (target : ?)'.replace(/target/g, targetName).replace('?', target));
	}
	return parsedTarget;
};

exports.checkBoolean = function(target, targetName){
	exports.checkUndefinedOrNull(target, targetName);
	
	switch(target){
	case 'true':
	case 'false':
		break;
	default:
		throw Error('target is not boolean');
	}
	return Boolean(target);
};
