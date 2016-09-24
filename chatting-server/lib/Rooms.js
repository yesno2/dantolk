'use strict'

const ChattingRoom = require('./ChattingRoom');
const util = require('../../lib/util');

function Rooms(){
	this.rooms = new Array();	
}

Rooms.prototype.addRoom = function(repsId){
	let chattingRoom = new ChattingRoom(repsId);
	rooms.push(chattingRoom);
	return chattingRoom;
};

Rooms.prototype.deleteRoom = function(repsId){
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
};

module.exports = exports = new Rooms();
