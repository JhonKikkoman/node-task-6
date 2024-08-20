/** @format */

import { Server, Socket } from "socket.io"

interface msgT {
  userName: string;
  text: string;
  type?: string;
}

export default function onConnection(io: Server, socket: Socket) {
  const { id } = socket;
  socket.on('message-me', (msg: msgT) => {
    msg.type = 'me';
    socket.emit('message-me', msg);
  });
  socket.on('message-all', (msg: msgT) => {
    msg.type = 'all';
    socket.broadcast.emit('message-all', msg);
    socket.emit('message-all', msg);
  });

  const { roomName } = socket.handshake.query;
  socket.join(roomName);
  socket.on('message-room', (msg: msgT) => {
    msg.type = `room: ${roomName}`;
    io.to(roomName).emit('message-all', msg);
    socket.emit('message-all', msg);
  });
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
}
