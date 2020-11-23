import 'bootstrap/js/dist/collapse';
import './style/style.scss';

import domModule from './dom';

import {
  processNewProjectForm,
  processNewTaskForm,
} from './logic';

document
  .getElementById('submit-task-form-button')
  .addEventListener('click', () => {
    processNewTaskForm();

    const tasksList = JSON.parse(localStorage.getItem('selected project')).tasks || [];
    const tasksColumn = document.querySelector('.task-list');
    domModule.populateList(tasksColumn, tasksList, domModule.displayTask);
    document.getElementById('display-task-form-btn').click();
  });

document
  .getElementById('submit-project-form-button')
  .addEventListener('click', () => {
    processNewProjectForm();
    const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsColumn = document.querySelector('.project-list');

    domModule.populateList(projectsColumn, projectsList, domModule.displayProject);
    document.getElementById('display-form-btn').click();
  });

const projectsColumn = document.querySelector('.project-list');
const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

domModule.populateList(projectsColumn, projectsList, domModule.displayProject);