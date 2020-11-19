import 'bootstrap/js/dist/collapse';
import './style/style.scss';
import { Task, Project } from './logic';
import { seedTasks, seedProjects, displayTask, displayProject, populateList } from './dom';

let testDiv = document.createElement('div');
let tasksColumn = document.querySelector('.task-list');
let projectsColumn = document.querySelector('.project-list');

populateList(tasksColumn, seedTasks, displayTask);

populateList(projectsColumn, seedProjects, displayProject);