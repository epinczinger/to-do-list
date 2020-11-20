import 'bootstrap/js/dist/collapse';
import './style/style.scss';

import {
  seedTasks,
  seedProjects,
  displayTask,
  displayProject,
  populateList,
  editProject
} from './dom';

const testDiv = document.createElement('div');
const tasksColumn = document.querySelector('.task-list');
const projectsColumn = document.querySelector('.project-list');

const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

populateList(projectsColumn, projectsList, displayProject);