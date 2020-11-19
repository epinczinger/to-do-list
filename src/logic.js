export function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.complete = false;
}

export function Project(title, description, dueDate, priority, tasks = []) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.tasks = tasks;
  this.addTask = (newTask) => {
    this.tasks.push(newTask);
  };
}

const projectForm = document.getElementById('project-form');
const inputTitle = document.getElementById('input-title');
const inputDescription = document.getElementById('input-description');
const inputDate = document.getElementById('input-date');
const inputPriority = document.getElementById('input-priority');
