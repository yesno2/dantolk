'use strict'

exports.insert = function(array, element, compare, option){
	if((typeof collection == 'undefined' || collection == null) && (typeof element == 'undefined' || element == null) && (typeof compare == 'undefined' || compare == null)){
		return false;
	}

	if(typeof compare == 'string'){
		option = compare;
	}

	switch(option.toLowerCase()){
	case 'asc':
		break;
	case 'desc':
		break;
	case 'front':
		array.unshift(element);
		break;
	case 'append':
	default:
		array.push(element);
	}
};

function insertSortByArray(collection, compare){
	let i, j, remember;
	i = n-1;
	while (i-- > 0){
		remember = data[(j = i)];
		while (++j < n && remember > data[j]);

		if ( --j == i ) continue;
//		memcpy ( data+i, data+i+1, sizeof(*data) * (j-i) );
		data[j] = remember;
	}
}
