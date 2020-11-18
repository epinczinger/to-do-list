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
const inputDescription = document.getElementById("input-description");
const inputDate = document.getElementById("input-date");
const inputPriority = document.getElementById("input-priority");

// const SubmitForm = () => {
//   const project = new Project(inputTitle.value, inputDescription.value, inputDate.value, inputPriority.value);
// }

const task1 = new Task('Shopings', "buy food for dinner", "tomorrow", "high");
const task2 = new Task("Fix car", "fix flat wheel", "today", "high");
const task3 = new Task("Studying", "read about physics", "this week", "medium");

const project1 = new Project('Learn to play Guitar', 'Get good enough at guitar that I can write and record an original song by the end of the year', '31st December 2020', 'low');
const project2 = new Project('Redecorate Room', 'Give my bedroom a makeover with new paint, furniture and decorations', '30th November 2020', 'medium'); 
const project3 = new Project('Improve garden', 'Do work on the garden to build vegetable plots and build a greenhouse', '1st February 2021', 'medium'); 

export const seedTasks = [task1, task2, task3];
export const seedProjects = [project1, project2, project3];

