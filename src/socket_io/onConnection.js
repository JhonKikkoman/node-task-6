/** @format */

export default function onConnection(io, socket) {
  const { id } = socket;
  socket.on('message-me', (msg) => {
    msg.type = 'me';
    socket.emit('message-me', msg);
  });
  socket.on('message-all', (msg) => {
    msg.type = 'all';
    socket.broadcast.emit('message-all', msg);
    socket.emit('message-all', msg);
  });

  const { roomName } = socket.handshake.query;
  socket.join(roomName);
  socket.on('message-room', (msg) => {
    msg.type = `room: ${roomName}`;
    io.to(roomName).emit('message-all', msg);
    socket.emit('message-all', msg);
  });
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}
