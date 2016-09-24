'use strict'

const EventEmitter = require('events').EventEmitter;

function User(id, socket){
	EventEmitter.call(this);
	this.id = id;
	this.socket = socket;
	let self = this;
	this.socket.on('disconnect', () => {
		self.emit('disconnect');
	}).on('message', (data) => {
		self.emit('message', data);	
	});
}
require('util').inherits(User, EventEmitter);

User.prototype.isUser = function(id){
	return this.id == id ? true : false;	
};

User.prototype.send = function(message){
	this.socket.emit('message', message);	
}

User.prototype.close = function(){
	if(this.socket.connected){
		this.socket.disconnect();
	}
}

module.exports = exports = User;
