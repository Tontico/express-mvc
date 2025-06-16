const tasks = require("../model/tasks");

class taskRepository {
  constructor() {
    this.tasks = tasks;
  }

  async findAll() {
    return this.tasks.findAll();
  }

  async findByPk(id) {
    return this.tasks.findByPk(id);
  }

  async create(taskData) {
    return this.tasks.create(taskData);
  }

  async update(taskData, options) {
    return this.tasks.update(taskData, options);
  }

  async destroy(options) {
    return this.tasks.destroy(options);
  }

  async findOne(options) {
    return this.tasks.findOne(options);
  }

}
module.exports = new taskRepository();
