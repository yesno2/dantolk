'use strict'

const rooms = require('./lib/Rooms');
const User = require('./lib/User');

const io = require('socket.io')();

io.on('connection', (socket) => {
	socket.on('roomInfo', (roomInfo) => {
		rooms.join(roomInfo.repsId, new User(roomInfo.id, socket));
	});
});

io.listen(5003);

module.exports = exports = io;
