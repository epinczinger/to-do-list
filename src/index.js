import 'bootstrap/js/dist/collapse';
import './style/style.scss';
import { Task, Project } from './logic';
import {
  seedTasks, seedProjects, displayTask, displayProject, populateList,
} from './dom';

const testDiv = document.createElement('div');
const tasksColumn = document.querySelector('.task-list');
const projectsColumn = document.querySelector('.project-list');

populateList(tasksColumn, seedTasks, displayTask);

const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

populateList(projectsColumn, projectsList, displayProject);