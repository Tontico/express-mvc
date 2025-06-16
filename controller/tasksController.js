const taskService = require("../service/tasksService");

class TaskController {
  constructor() {
    this.taskService = taskService;
  }
  index = async (req, res) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.render("tasks/index", { tasks: tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  store = async (req, res) => {
    try {
      await this.taskService.createTask(req.body);
      return res.redirect("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  create = (req, res) => {
    try {
      res.render("tasks/create");
    } catch (error) {
      console.error("Error rendering create task page:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  update = async (req, res) => {
    try {
      await this.taskService.updateTask(req.params.id, req.body);
      res.redirect("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  edit = async (req, res) => {
    try {
      const task = await this.taskService.editTasks(req.params.id);
      res.render("tasks/edit", { task: task });
    } catch (error) {
      console.error("Error rendering edit task page:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  delete = async (req, res) => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.redirect("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  toggleDone = async (req, res) => {
    try {
      await this.taskService.toggleDone(req.params.id);
      res.redirect("/tasks");
    } catch (error) {
      console.error("Error toggling task done status:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = new TaskController();
