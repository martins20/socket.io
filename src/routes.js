const routes = require("express").Router();
// here we declare that the router is the socket client for example, so that when a request is made we can send an event
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3333");

const Array = require("./app/models/Array");

routes.post("/array", async (req, res) => {
  const todo = new Array(req.body);

  const response = await todo.register();

  // event for create anoter TodoTask
  socket.emit("create", response);

  return res.json(response);
});

routes.put("/array/:arrayId", async (req, res) => {
  const { arrayId } = req.params;
  const { todoTask } = req.body;

  const todo = new Array({ todoTask, arrayId });

  const response = await todo.update();

  // event for update of TodoTask clone
  socket.emit("update", { name: response.name, todoTask });

  return res.json(response);
});

module.exports = routes;
