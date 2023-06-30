const app = require('express')();
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const SocketIO = require('socket.io');
const socketIO = new SocketIO.Server(server, {
  cors: {
    origin: '*',
  },
});

/**
 * @param {SocketIO.Socket} socket
 * @param {*} data
 */
const handleSocketMessage = (socket, data) => {
  console.log(`${socket.id}가 보냄: `, data);

  socket.broadcast.emit('Message', data);
};

/** @param {SocketIO.Socket} socket */
const handleSocketDisconnect = (socket) => {
  console.log('User Leaved: ', socket.id);

  userList.delete(socket.id);
  console.log('Current Users: ', [...userList.values()]);

  socket.broadcast.emit('USER_LEAVE', socket.id);
};

const userList = new Set([]);

/** @param {SocketIO.Socket} socket */
const handleConnection = (socket) => {
  userList.add(socket.id);

  console.log('User Entered: ', socket.id);
  console.log('Current Users: ', [...userList.values()]);

  socket.broadcast.emit('USER_ENTER', socket.id);

  socket.on('Message', (data) => handleSocketMessage(socket, data));
  socket.on('disconnect', () => handleSocketDisconnect(socket));
};

socketIO.on('connection', handleConnection);
