import {
  displayProject,
  populateList,
  displayTask,
} from './dom';

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
  this.tasks = [];
  this.addTask = (newTask) => {
    this.tasks.push(newTask);
  };
}

export function processNewProjectForm () {
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

export function processNewTaskForm () {
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
    newTaskPriority,
  );

  const projectsList = JSON.parse(localStorage.getItem('projects'));
  const selectedProject = JSON.parse(localStorage.getItem('selected project'));

  const selectedProjectTaskList = selectedProject.tasks || [];
  selectedProjectTaskList.push(newTask);

  let selectedProjectIndex;

  for (let i = 0; i < projectsList.length; i += 1) {
    if (projectsList[i].title == selectedProject.title) {
      selectedProjectIndex = i;
    }
  }

  selectedProject.tasks = selectedProjectTaskList;
  projectsList[selectedProjectIndex].tasks = selectedProjectTaskList;

  localStorage.setItem('projects', JSON.stringify(projectsList));
  localStorage.setItem('selected project', JSON.stringify(projectsList[selectedProjectIndex]));
}
