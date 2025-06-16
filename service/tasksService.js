const tasksRepository = require("../repositories/tasksRepository");
const moment = require("moment");

class TaskService {
  constructor() {
    this.tasksRepository = tasksRepository;
    this.moment = moment;
  }

  async getAllTasks() {
    try {
      const allTasks = await this.tasksRepository.findAll();
      if (!allTasks || allTasks.length === 0) {
        return new Error("No tasks found");
      }
      return allTasks;
    } catch (error) {
      throw new Error("Error fetching tasks: " + error.message);
    }
  }

  async getTaskById(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        return new Error("No tasks found");
      }
      return task;
    } catch (error) {
      throw new Error("Error fetching task: " + error.message);
    }
  }

  async createTask(taskData) {
    try {
      const newTask = await this.tasksRepository.create(taskData);
      if (!newTask) {
        return new Error("No tasks found");
      }
      return { success: true, newTask };
    } catch (error) {
      throw new Error("Error creating task: " + error.message);
    }
  }

  async updateTask(id, taskData) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }
      const updated = await this.tasksRepository.update(taskData, {
        where: { id },
      });
      if (!updated) {
        return new Error("No tasks found");
      }

      return { message: "Task updated successfully" };
    } catch (error) {
      throw new Error("Error updating task: " + error.message);
    }
  }

  async editTasks(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }

      if (task.start_date) {
        task.start_date_formated = moment(task.start_date).format("YYYY-MM-DD");
      }
      if (task.end_date) {
        task.end_date_formated = moment(task.end_date).format("YYYY-MM-DD");
      }

      return task;
    } catch (error) {
      throw new Error("Error editing task: " + error.message);
    }
  }

  async deleteTask(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }
      await this.tasksRepository.destroy({ where: { id } });
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting task: " + error.message);
    }
  }

  async toggleDone(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }
      task.done = !task.done;
      await task.save();
      return { message: "Task status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling task status: " + error.message);
    }
  }
}

module.exports = new TaskService();
