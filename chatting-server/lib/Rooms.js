'use strict'

const ChattingRoom = require('./ChattingRoom');

function Rooms(){
	this.rooms = new Array();	
}

Rooms.prototype.addRoom = function(repsId){
	let chattingRoom = new ChattingRoom(repsId);
	rooms.push(chattingRoom);
	return chattingRoom;
};

Rooms.prototype.deleteRoom = function(repsId){
	let index = this.rooms.findIndex((room) => {
		room.isRoom(repsId);	
	});
	return index >= 0 ? this.rooms.splice(index, 1) : false;
};

Rooms.prototype.join = function(repsId, user){
	let room = this.rooms.find((room) => {
		return room.isRoom(repsId);	
	});
	if(room){
		room = this.addRoom(repsId);	
	}

	room.addUser(user);
};

module.exports = exports = new Rooms();
