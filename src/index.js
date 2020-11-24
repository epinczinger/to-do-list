import 'bootstrap/js/dist/collapse';
import './style/style.scss';

import domModule from './dom';
import {
  Project,
  processNewProjectForm,
  processNewTaskForm,
} from './logic';


import { updateLocalStorage } from './helpers';

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

const projects = JSON.parse(localStorage.getItem('projects'));
const selectedProject = JSON.parse(localStorage.getItem('selected-project'));

if (projects === null) {
  const seedProject = new Project('Default Project', 'This is a project to get you started. Feel free to change the name, description and date!', '01/01/3000');
  updateLocalStorage([
    ['projects', JSON.stringify([seedProject])],
  ]);
}
if ([null, []].includes(selectedProject)) {
  const firstProject = JSON.parse(localStorage.getItem('projects'))[0];
  updateLocalStorage([
    ['selected project', JSON.stringify(firstProject)],
  ]);
}

domModule.refreshLists();

// Import bootstrap
// Import styles
// Import domModule
// Import form-processing functions
// Add event listeners to form submission buttons
// Add event listeners to form submission buttons