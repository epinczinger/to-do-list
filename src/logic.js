import {
  displayProject,
  populateList,
  displayTask,
} from "./dom";

const task1 = new Task('Shopings', 'buy food for dinner', 'tomorrow', 'high');
const task2 = new Task('Fix car', 'fix flat wheel', 'today', 'high');
const task3 = new Task('Studying', 'read about physics', 'this week', 'medium');

const seedTasks = [task1, task2, task3];

export function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.complete = false;
}

export function Project(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.tasks = seedTasks;
  this.addTask = (newTask) => {
    this.tasks.push(newTask);
  };
}

const projectForm = document.getElementById('project-form');
const taskForm = document.getElementById('task-form');

const taskFormSubmitButton = taskForm.getElementsByClassName('btn', 'btn-primary')[0];
const projectFormSubmitButton = projectForm.getElementsByClassName('btn', 'btn-primary')[0];

function processNewProjectForm(form) {
  const newProjectTitle = document.getElementById('project-input-title').value;
  const newProjectDescription = document.getElementById(
    'project-input-description',
  ).value;
  const newProjectDueDate = document.getElementById('project-input-date').value;

  document.getElementById('project-input-title').value = '';
  document.getElementById('project-input-description').value = '';
  document.getElementById('project-input-date').value = '';

  const newProject = new Project(
    newProjectTitle,
    newProjectDescription,
    newProjectDueDate,
  );

  const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
  projectsList.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projectsList));
}

projectFormSubmitButton.addEventListener('click', function (event) {
  processNewProjectForm(this.parentElement);

  let projectsList = JSON.parse(localStorage.getItem("projects")) || [];
  let projectsColumn = document.querySelector(".project-list");

  populateList(projectsColumn, projectsList, displayProject);

  let displayBtn = document.getElementById('display-form-btn');

  displayBtn.click();
});

function processNewTaskForm(form) {
  const newTaskTitle = document.getElementById('task-input-title').value;
  const newTaskDescription = document.getElementById(
    'task-input-description',
  ).value;
  const newTaskDueDate = document.getElementById('task-input-date').value;
  const newTaskPriority = document.getElementById('task-input-priority').value;

  document.getElementById('task-input-title').value = '';
  document.getElementById('task-input-description').value = '';
  document.getElementById('task-input-date').value = '';
  document.getElementById('task-input-priority').value = 'Low';

  const newTask = new Task(
    newTaskTitle,
    newTaskDescription,
    newTaskDueDate,
    newTaskPriority
  );

  // Now that we've created the task, push it into the project['selected project'].tasks array

  // Get the current project list
  const projectsList = JSON.parse(localStorage.getItem('projects'));

  // Locate the currently selected project.

  

  const tasksList = JSON.parse(localStorage.getItem('projects')) || [];
  projectsList.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projectsList));
}