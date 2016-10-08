'use strict'

<<<<<<< HEAD
=======
exports.iter = function(arr, callback){
	for(let i = 0; i < arr.length; i++){
		if(callback(arr[i], i, arr)){
			break;	
		}	
	}	
};
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
