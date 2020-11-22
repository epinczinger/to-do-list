import 'bootstrap/js/dist/collapse';
import './style/style.scss';

import {
  displayProject,
  displayTask,
  populateList,
} from './dom';

import {
  processNewProjectForm,
  processNewTaskForm,
} from './logic';

const taskFormSubmitButton = document.getElementById('submit-task-form-button');
const projectFormSubmitButton = document.getElementById(
  'submit-project-form-button',
);

taskFormSubmitButton.addEventListener('click', () => {
  processNewTaskForm();
  const tasksList = JSON.parse(localStorage.getItem('selected project')).tasks || [];
  const tasksColumn = document.querySelector('.task-list');

  populateList(tasksColumn, tasksList, displayTask);
  const displayBtn = document.getElementById('display-task-form-btn');
  displayBtn.click();
});

projectFormSubmitButton.addEventListener('click', () => {
  processNewProjectForm();
  const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
  const projectsColumn = document.querySelector('.project-list');

  populateList(projectsColumn, projectsList, displayProject);
  const displayBtn = document.getElementById('display-form-btn');
  displayBtn.click();
});

const projectsColumn = document.querySelector('.project-list');
const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

populateList(projectsColumn, projectsList, displayProject);