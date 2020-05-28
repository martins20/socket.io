const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

require("dotenv").config();

const port = process.env.APP_PORT;
const Clone = require("./app/models/Array");

const routes = require("./routes");

// here we start do manipulate the socket.io listening events.
io.on("connection", (socket) => {
  console.log(` ==> User "${socket.id}" is connected ...`);

  // when a client disconnected from the server, it automatically emits this event
  socket.on("disconnect", ({ id }) => {
    console.log(`==> User "${id}" are disconnected ...`);
  });

  // here we start to hear all event on below
  socket.on("create", async (data) => {
    const arrayClone = new Clone(data);
    await arrayClone.createClone();
  });

  socket.on("update", async (data) => {
    const arrayClone = new Clone(data);
    await arrayClone.findAndClone();
  });
});

app.use(express.json());
app.use(routes);

http.listen(port, console.log(`Listening on port: ${port}`));
