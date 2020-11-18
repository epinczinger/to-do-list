export function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
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