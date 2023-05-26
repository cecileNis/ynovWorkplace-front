const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval;
let users = [];
let messages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  console.log(users);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("user login", (user) => {
    if (!users.find(({ id }) => id === user.id)) users.push({ ...user, socketId: socket.id });
    console.log(users);
    io.emit("new login", users);
  });

  socket.on("user logout", (user) => {
    users = users.filter(({ id }) => user.id !== id);
    console.log(users);
    io.emit("new login", users);
  });

  socket.on("loggedUser init", () => {
    console.log("loggedUser init");
    io.emit("new login", users);
  });

  socket.on("messages init", (data) => {
    console.log("messages init");
    messages = data;
  });

  socket.on("message add", (message) => {
    messages = [...messages, message];
    console.log(`new message : ${message}`);
    io.emit("new message", messages);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnect");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
