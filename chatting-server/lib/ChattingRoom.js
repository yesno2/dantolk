'use strict'

<<<<<<< HEAD
=======
const util = require('../../lib/util');

>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
function ChattingRoom(repsId, user){
	this.repsId = repsId;
	this.users = new Array();
	
	if(user){
		this.addUser(user);
	}

	this.messageQueue = new Array();
	this.lock = false;

	let self = this;
	this.interval = setInterval(() => {
		if(self.messageQueue.length > 0){
			while(self.messageQueue.length > 0){
				send(self, self.messageQueue.shift());
			}
		}
	}, 20);
}

ChattingRoom.prototype.isRoom = function(repsId){
	return this.repsId == repsId ? true : false;
};

ChattingRoom.prototype.addUser = function(user){
	let self = this;
	Array.isArray(user) ? user.forEach((u) => {
		self.users.push(addEventListener(self, u));
	}) : this.users.push(addEventListener(this, user));
};

function addEventListener(self, user){
	user.on('disconnect', () => {
		self.deleteUser(user.id);
	}).on('message', (message) => {
		self.send(message);	
	});
	return user;
}

ChattingRoom.prototype.deleteUser = function(id){
<<<<<<< HEAD
	let index = this.users.findIndex((element) => {
		return element.isUser(id);
	});
	return index > 0 ? this.users.splice(index, 1) : false;
=======
	util.iter(this.users, (user, index, users) => {
		if(user.isUser(id)){
			user.close();
			users.splice(index, 1);
			return true;
		}
	});
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
};

ChattingRoom.prototype.send = function(message){
	this.messageQueue.push(message);
}

function send(self, message){
	this.users.forEach((user) => {
		user.send(message);	
	});	
}

ChattingRoom.prototype.close = function(){
	clearInterval(this.interval);	
	this.messageQueue.splice(0, this.messageQueue.length);
	this.users.forEach((user) => {
		user.close();
	});
}

module.exports = exports = ChattingRoom;
