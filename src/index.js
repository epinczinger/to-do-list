import 'bootstrap/js/dist/collapse';
import './style/style.scss';

import {
  displayProject,
  populateList
} from './dom';

const projectsColumn = document.querySelector('.project-list');
const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

populateList(projectsColumn, projectsList, displayProject);