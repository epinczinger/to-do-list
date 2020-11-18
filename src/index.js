import './style/style.scss';
import { Task, Project } from './logic';
import { seedTasks, seedProjects, displayTask, displayAllTasks } from './dom';

// displayAllTasks(projectsColumn, seedTasks, displayTask);

// let taskCard = displayTask(seedTasks[0]);

let testDiv = document.createElement('div');
let projectsColumn = document.querySelector('#projects-column .project-list');

displayAllTasks(projectsColumn, seedTasks, displayTask);