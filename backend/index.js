const express = require('express');
const app = express();

const server = require('http').Server(app);
const { v1: uuidv1 } = require('uuid');

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});


const port = process.env.PORT || 5000;

let rooms = new Map();

io.on("connection", (socket) => {

  let socketUser;
  let roomId; 
  let history;
  let currentSession;

  socket.on("create room", () => {
    const session = {
      history: {
        lastIdUser: 0,
        users: [],
        messages: [], 
      },
      currentSession: {//Показывет состояние сессии на данный момент
        users: [],
      }
    };
    const roomId = uuidv1();
    rooms.set(roomId , session);
    socket.emit("created room", roomId);
  });

  socket.on("join room", (id) => {
    if (!rooms.has(id)) {
      console.log("failed join", id);
      socket.emit("failed join");
      return;
    }
    history = rooms.get(id).history;
    currentSession = rooms.get(id).currentSession;
    roomId = id;
    socket.join(roomId);
    socket.emit("succes join", roomId);
  });

  socket.on("list name", () => {
    if (!roomId) return;
    const usernames = history.users.map((user) => user.name);
    socket.to(roomId).emit("list name", usernames);
  });

  socket.on("add user", (username) => {
    if (!history) return;
    const nextId = history.lastIdUser + 1;
    history.lastIdUser = nextId;
    const user = {
      id: nextId, 
      name: username
    };
    history.users.push(user);
    socketUser = user;
    currentSession.users.push(user);
    socket.emit("history", {...history, lastIdUser: null});
    socket.emit("id", socketUser.id);//индетефицируем пользователя на сервере
    socket.broadcast.to(roomId).emit("added user", socketUser);
    const usernames = history.users.map((user) => user.name);
    socket.broadcast.to(roomId).emit("list name", usernames);//Для авторизации
  });

  socket.on("history", () => {
    // socket.emit("history", {...history, lastIdUser: null});
  });

  socket.on('new message', (message) => {
    const messageLength = history.messages.length;
    const newMessage = { id: messageLength + 1, ...message};
    history.messages.push(newMessage);
    console.log(history.messages);
    io.sockets.in(roomId).emit('new message', newMessage);
  });

  socket.on('disconnect', () => {
    if (!socketUser) return; 
    currentSession.users = currentSession.users.filter((user) => user.id !== socketUser.id);
    socket.broadcast.to(roomId).emit("disconect", socketUser);
  });
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});