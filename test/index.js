'use strict'
let arr = [{
	id: 'id',
	pw: 'pw'		
}, {
	id: 'id1',
	pw: 'pw1'
}];

console.log(arr.findIndex((element, index, array) => {
	return element.id == 'id1';
}));
