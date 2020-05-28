const mongoose = require("../../database");

const schema = new mongoose.Schema({
  name: String,
  todoTasks: [String],
});

const arrayModel = mongoose.model("Array", schema);

class Array {
  constructor(body) {
    this.body = body;
  }

  async register() {
    return await arrayModel.create(this.body);
  }

  async update() {
    const array = await arrayModel.findById(this.body.arrayId);

    const { todoTasks } = array;

    await array.updateOne({
      todoTasks: [...todoTasks, this.body.todoTask],
    });

    return array;
  }

  // method to clone when the socket emits an event.

  async createClone() {
    const { name, todoTasks } = this.body;
    return await arrayModel.create({
      name: `Clone of ${name}`,
      todoTasks,
    });
  }

  async findAndClone() {
    const array = await arrayModel.findOne({
      name: `Clone of ${this.body.name}`,
    });

    const { todoTasks } = array;

    return array.updateOne({
      todoTasks: [...todoTasks, this.body.todoTask],
    });
  }
}

module.exports = Array;
