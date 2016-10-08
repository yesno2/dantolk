'use strict'

const ChattingRoom = require('./ChattingRoom');
<<<<<<< HEAD
=======
const util = require('../../lib/util');
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f

function Rooms(){
	this.rooms = new Array();	
}

Rooms.prototype.addRoom = function(repsId){
	let chattingRoom = new ChattingRoom(repsId);
	rooms.push(chattingRoom);
	return chattingRoom;
};

Rooms.prototype.deleteRoom = function(repsId){
<<<<<<< HEAD
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
=======
	util.iter(this.rooms, (room, index, rooms) => {
		if(room.isRoom(repsId)){
			room.close();
			rooms.splice(index, 1);
			return true;	
		}	
	});	
};

Rooms.prototype.join = function(repsId, user){
	let joinRoom;

	util.iter(this.rooms, (room) => {
		if(room.isRoom(repsId)){
			joinRoom = room;
			return true;
		}	
	});

	if(!joinRoom){
		joinRoom = this.addRoom(repsId);
	}
	joinRoom.addUser(user);
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
};

module.exports = exports = new Rooms();
