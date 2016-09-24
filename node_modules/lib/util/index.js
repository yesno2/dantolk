'use strict'

exports.iter = function(arr, callback){
	for(let i = 0; i < arr.length; i++){
		if(callback(arr[i], i, arr)){
			break;	
		}	
	}	
};
